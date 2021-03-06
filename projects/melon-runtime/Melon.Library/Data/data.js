const data = {
    clone: function (target) {
        if (typeof target === "function") {
            return function () { target(...arguments ?? ''); }
        }

        return JSON.parse(JSON.stringify(target));
    },
    compare: (value1, value2, cmpFn) => {
        if (cmpFn === void 0) { cmpFn = function (a, b) { return a === b } };
        const firstConstructor = value1.constructor.name;
        const secondConstructor = value2.constructor.name;

        if (firstConstructor !== secondConstructor)
            return cmpFn(value1, value2);

        let len1 = null;
        let len2 = null;

        switch (firstConstructor) {
            case "Map":
                let map1 = value1;
                let map2 = value2;
                len1 = map1.size;
                len2 = map2.size;

                if (len1 !== len2)
                    return false;

                let arrayMap1 = Array.from(map1.entries());
                let arrayMap2 = Array.from(map1.entries());
                return compare(arrayMap1, arrayMap2, cmpFn);

            case "Set":
                let set1 = value1;
                let set2 = value2;
                len1 = set1.size;
                len2 = set2.size;

                if (len1 !== len2)
                    return false;

                let setArray1 = Array.from(set1);
                let setArray2 = Array.from(set2);
                return data.compare(setArray1, setArray2);

            case "Array":
                let array1 = value1;
                let array2 = value2;
                len1 = array1.length;
                len2 = array2.length;

                if (len1 !== len2)
                    return cmpFn(len1, len2);

                for (let i = 0; i < (len1 !== null && len1 !== void 0 ? len1 : 0); i++) {
                    if (!data.compare(array1[i], array2[i], cmpFn)) {
                        return cmpFn(array1[i], array2[i]);
                    }
                }

                break;

            case "Object":
                let obj1 = value1;
                let obj2 = value2;
                let objArray1 = Object.entries(obj1);
                let objArray2 = Object.entries(obj2);
                len1 = objArray1.length;
                len2 = objArray2.length;

                if (len1 !== len2)
                    return cmpFn(len1, len2);

                return data.compare(objArray1, objArray2, cmpFn);

            default:
                return cmpFn(value1.toString(), value2.toString());
        }

        return true;
    },
    find: (object, target, count = 0, found = false) => {
        if (typeof target == "object") {
            if (data.compare(object, target)) {
                found = true;
                count++;
            }
            switch (target.constructor.name) {
                case "Array":
                    const len = target.length;

                    for (let i = 0; i < len; i++) {
                        const res = data.find(object, target[i]);
                        count += res.count;
                        if (!found) found = res.found;
                    }

                    break;

                case "Object":
                    const entries = Object.entries(target);
                    const lenObj = entries.length;

                    for (let i = 0; i < lenObj; i++) {
                        const res = data.find(object, entries[i][1]);
                        count += res.count;
                        if (!found) found = res.found;
                    }

                    break;

                case "Map":
                    for (let [key, value] of target) {
                        const res = data.find(object, value)
                        count += res.count;
                        if (!found) found = res.found;
                    }

                    break;

                case "Set":
                    for (let element of target) {
                        const res = data.find(object, element);
                        count += res.count;
                        if (!found) found = res.found;
                    }

                    break;

                default:
                    if (data.compare(object, target)) {
                        count++;
                        found = true;
                    }
            }
        }
        else {
            if (data.compare(object, target)) {
                count++;
                found = true;
            }
        }
        return {
            count,
            found
        }
    },
    PgClient: function (host, port, database, username, password) {
        this._connectionString = `Server=${host};Port=${port};Database=${database};User Id=${username};Password=${password};`
        this.executeNonQuery = (sql) => _$internalBinding["PostgreSQLBindingNonQuery"](sql, this._connectionString);
        this.executeQuery = (sql) => JSON.parse(_$internalBinding["PostgreSQLBindingQuery"](sql, this._connectionString));

        return this;
    },
    MySQLClient: function (host, port, database, username, password) {
        this._connectionString = `Server=${host};Port=${port};Database=${database};User Id=${username};Password=${password};`;
        this.executeNonQuery = (sql) => _$internalBinding["MySqlBindingNonQuery"](sql, this._connectionString);
        this.executeQuery = (sql) => JSON.parse(_$internalBinding["MySqlBindingQuery"](sql, this._connectionString));

        return this;
    },
    SqlServerClient: function (host, port, database, username, password) {
        this._connectionString = `Server=${host};Port=${port};Database=${database};User Id=${username};Password=${password};`;
        this.executeNonQuery = (sql) => _$internalBinding["SqlServerBindingNonQuery"](sql, this._connectionString);
        this.executeQuery = (sql) => JSON.parse(_$internalBinding["SqlServerBindingQuery"](sql, this._connectionString));

        return this;
    }
}