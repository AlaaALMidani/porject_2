const M = 0.02897; // The molar mass of dry air
const R = 8.31447; // The universal gas constant
const a = -0.00651; // The lapse rate
const To = 288.15; // Standard temperature at sea level
const Po = 101324; // Atmospheric pressure at sea level
const g = 9.82; // Gravity force
const L = 0.00065; // Temperature lapse rate
const C = 0.47;
const k = 0.026; // k is thermal conductivity of air

const toRadians = (degrees, precision = 2) => {
    return parseFloat(
        ((parseFloat(degrees) * Math.PI) / 180).toFixed(precision),
    );
};

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    // Add a vector to this vector
    add(other) {
        return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    // Subtract a vector from this vector
    subtract(other) {
        return new Vector(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    // Calculate the dot product of this vector and another vector
    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    // Calculate the cross product of this vector and another vector
    cross(other) {
        return new Vector(
            this.y * other.z - this.z * other.y,
            this.z * other.x - this.x * other.z,
            this.x * other.y - this.y * other.x,
        );
    }

    // Get the magnitude (length) of this vector
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    // Get the normalized vector (i.e. make it a unit vector)
    normalized() {
        const mag = this.length();
        if (mag == 0) return new Vector(this.x, this.y, this.z);
        else return new Vector(this.x / mag, this.y / mag, this.z / mag);
    }

    // Multiply the vector by a scalar value
    mult(scalar) {
        return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    // Divide the vector by a scalar value
    div(scalar) {
        return new Vector(this.x / scalar, this.y / scalar, this.z / scalar);
    }

}

const world = {
    air_angle_x: 180,
    air_angle_y: 0,
    air_velocity: 1,
    get wind_velocity() {
        const ax = toRadians(this.air_angle_x);
        const ay = toRadians(this.air_angle_y);
        const v = this.air_velocity;
        const x = v * Math.cos(ax) * Math.cos(ay);
        const y = v * Math.sin(ax) * Math.cos(ay);
        const z = v * Math.sin(ay);
        return new Vector(x, y, z);
    },
    get wind_direction() {
        this.wind_velocity.normalized();
    },
    ballon_position: new Vector(0, 1, 0),
    ballon_velocity: new Vector(0, 1, 0),
    ballon_mass: 48,
    ballon_molar_mass: 0.02696,
    ballon_torch_temp: 120,
    ballon_radius: 8, // in meters
    ballon_basket_height: 1,
    ballon_mesh_thickness: 0.3, // 3mm
    ballon_mesh_temp_loss_constant: 0.4, // 0.35 - 0.45
    ballon_specific_heat_capacity: 1300, // nylon  J/kg-K
    __ballon_temp: 288.15,
    get ballon_temp() {
        // Calculate heat transfer rate based on torch temperature, room temp and radius
        const q =
            (4 * Math.PI * k * (this.ballon_torch_temp - this.__ballon_temp)) /
            this.ballon_radius;

        this.__ballon_temp =
            this.__ballon_temp +
            q /
                ((4 / 3) *
                    Math.PI *
                    this.ballon_radius ** 3 *
                    this.ballon_density);

        return this.__ballon_temp;
    },
    get ballon_air_mass() {
        const p = this.ballon_pressure;
        const t = this.__ballon_temp;
        const v = this.ballon_volume;
        return ((p * v) / R) * t;
    },
    get ballon_surface_area() {
        return (Math.PI * Math.pow(this.ballon_radius, 2)) / 4;
    },
    get ballon_pressure() {
        return Po * Math.pow(this.__ballon_temp / To, -g / R.a);
    },
    get ballon_volume() {
        return (4 / 3) * Math.PI * Math.pow(this.ballon_radius, 3);
    },
    get ballon_density() {
        return (
            (this.pressure * this.ballon_molar_mass) / (R * this.__ballon_temp)
        );
    },
    get ballon_temp_loss() {
        // Q
        const k = this.ballon_mesh_temp_loss_constant;
        const A = this.ballon_surface_area;
        const t1 = this.__ballon_temp;
        const t2 = this.temp;
        const d = this.ballon_mesh_thickness;
        const c = this.ballon_specific_heat_capacity;
        return (k * A * (t1 - t2)) / d / c;
    },
    // Calculating the air pressure outside the ballon
    get pressure() {
        const height = this.ballon_position.y;
        return Po * Math.pow(1 - (L * height) / To, (g * M) / (R * L));
    },
    // Calculating the air temprrature outside the ballon
    get temp() {
        const height = this.ballon_position.y;
        return To - L * height;
    },
    // Calculating the air density at the ballon's altitude
    get density() {
        return (this.pressure * M) / (R * this.temp);
    },

    /**
     * Forces
     */
    weightForce: function () {
        const m = this.ballon_mass;
        return new Vector(0, -m * g, 0);
    },
    bouyancyForce: function () {
        const f = (this.density - this.ballon_density) * g * this.ballon_volume;
        return new Vector(0, f, 0);
    },
    airResistanceForce: function () {
        const ad = this.density;
        const a = this.ballon_surface_area;
        const mg = this.ballon_velocity.length();
        const f = 0.5 * ad * C * a * (mg * mg);
        const v = this.ballon_velocity.normalized().mult(-f);
        return v;
    },
    windResistanceForce: function () {
        // Balloon velocity vector
        const v = this.ballon_velocity;
        // Wind velocity vector
        const w = this.wind_velocity;
        // Relative velocity between balloon and air (includes wind effect)
        const v_rel = v.subtract(w);
        // Magnitude of relative velocity
        const vm = v_rel.length();
        // Surface area of balloon
        const a = this.ballon_surface_area;
        // Wind resistance force magnitude
        const f = 0.5 * C * a * vm ** 2;
        // Direction of wind resistance force (opposite to relative velocity)
        const f_dir = v_rel.normalized().mult(-f);
        // Return wind resistance force vector
        return f_dir;
    },
    netForces: function () {
        let netForce = new Vector(0, 0, 0);
        netForce = netForce.add(this.airResistanceForce());
        netForce = netForce.add(this.windResistanceForce());
        netForce = netForce.add(this.bouyancyForce());
        netForce = netForce.add(this.weightForce());
        return netForce;
    },
    update: function (dt) {
        const acc = this.netForces().div(this.ballon_mass);
        const k1 = acc;
        const k2 = k1.mult(dt).div(2).add(acc);
        const k3 = k2.mult(dt).div(2).add(acc);
        const k4 = k3.mult(dt).add(acc);
        let v = new Vector(0, 0, 0);
        v = k1.add(k2.mult(2)).add(k3.mult(2)).add(k4).mult(dt).div(6);
        this.ballon_velocity = this.ballon_velocity.add(v);
        this.ballon_position = this.ballon_position.add(
            this.ballon_velocity.mult(dt),
        );
        const { y } = this.ballon_position;
        this.ballon_position.y = Math.max(y, 0);
        self.postMessage({
            ...this.ballon_position,
            temp: kelvinToCelsius(this.ballon_temp),
            density: this.density,
            ballon_density: this.ballon_density,
        });
    },
    change: function (prop, value) {
        if (world.hasOwnProperty(prop) && typeof world[prop] != "function") {
            world[prop] = value;
        }
    },
};

self.addEventListener(
    "message",
    function (e) {
        const data = e.data;
        if (
            world.hasOwnProperty(data.method) &&
            typeof world[data.method] == "function"
        ) {
            world[data.method](...data.args);
        }
    },
    false,
);
