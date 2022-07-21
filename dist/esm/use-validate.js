import _ from "lodash";
var useValidate = function (initial) {
    /** helpers */
    var isBlank = function (d) { return (d === null || d === undefined || d === ''); };
    var isEmpty = function (d) { return Array.isArray(d) && d.length === 0; };
    var isPristine = function (d) { return _.isEqual(d, initial); };
    var includes = function (d, val) { return d.length > 0 && d.indexOf(val) !== -1; };
    var hasPattern = function (d, regex) { return !!d && regex.test(d); };
    var hasMaxLength = function (d, length) { return !!d && d.length <= length; };
    var hasMinLength = function (d, length) { return !!d && d.length >= length; };
    /** validators */
    var required = function (id, msg) { return function (d) { return isBlank(d[id]) ? { id: id, msg: msg } : null; }; };
    var empty = function (id, msg) { return function (d) { return isEmpty(d[id]) ? { id: id, msg: msg } : null; }; };
    var notEmpty = function (id, msg) { return function (d) { return !isEmpty(d[id]) ? { id: id, msg: msg } : null; }; };
    var contains = function (id, val, msg) {
        if (msg === void 0) { msg = ''; }
        return function (d) { return includes(d[id], val) ? { id: id, msg: msg } : null; };
    };
    var pattern = function (id, regex, msg) { return function (d) { return !hasPattern(d[id], regex) ? { id: id, msg: msg } : null; }; };
    var minlength = function (id, n, msg) { return function (d) { return !hasMinLength(d[id], n) ? { id: id, msg: msg } : null; }; };
    var maxlength = function (id, n, msg) { return function (d) { return !hasMaxLength(d[id], n) ? { id: id, msg: msg } : null; }; };
    var greaterThan = function (id, n, msg) { return function (d) { return (n >= parseInt(d[id], 10)) ? { id: id, msg: msg } : null; }; };
    var greaterThanOrEqual = function (id, n, msg) { return function (d) { return (n > parseInt(d[id], 10)) ? { id: id, msg: msg } : null; }; };
    var lessThan = function (id, n, msg) { return function (d) { return (n <= parseInt(d[id], 10)) ? { id: id, msg: msg } : null; }; };
    var lessThanOrEqual = function (id, n, msg) { return function (d) { return (n < parseInt(d[id], 10)) ? { id: id, msg: msg } : null; }; };
    var equal = function (id, val, msg) { return function (d) { return (val !== d[id]) ? { id: id, msg: msg } : null; }; };
    var notEqual = function (id, val, msg) { return function (d) { return (val === d[id]) ? { id: id, msg: msg } : null; }; };
    /** composites */
    var and = function () {
        var rules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rules[_i] = arguments[_i];
        }
        return function (d) {
            var result;
            for (var i = 0, l = rules.length; i < l; ++i) {
                result = rules[i](d);
                if (result) {
                    return result;
                }
            }
        };
    };
    var or = function () {
        var rules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rules[_i] = arguments[_i];
        }
        return function (d) {
            var result = null;
            // needs a refactor
            for (var i = 0, l = rules.length; i < l; ++i) {
                result = rules[i](d);
                if (!result) {
                    // @ts-ignore
                    return;
                }
            }
            return result;
        };
    };
    /** conditional */
    var when = function (pred, rule) { return function (d) { return pred(d) ? rule(d) : null; }; };
    /** conditional - predicates */
    var matches = function (id, regex) { return function (d) { return hasPattern(d[id], regex); }; };
    var inArray = function (id, arr) { return function (d) { return arr.indexOf(d[id]) !== -1; }; };
    var isNotBlank = function (value) { return function () { return !isBlank(value); }; };
    /** execution */
    var validate = function (validators, data) {
        if (!Array.isArray(validators)) {
            throw new Error('validate expects rules to be an array, was ' + typeof validators);
        }
        var tmp = {};
        return validators.reduce(function (errors, validator) {
            var error = validator(data);
            if (error) {
                if (!tmp[error.id]) {
                    tmp[error.id] = { id: error.id };
                    tmp[error.id].messages = [];
                    errors.push(tmp[error.id]);
                }
                tmp[error.id].messages.push(error.msg);
            }
            return errors;
        }, []);
    };
    return {
        isBlank: isBlank,
        isEmpty: isEmpty,
        isPristine: isPristine,
        includes: includes,
        hasPattern: hasPattern,
        hasMaxLength: hasMaxLength,
        hasMinLength: hasMinLength,
        required: required,
        empty: empty,
        notEmpty: notEmpty,
        contains: contains,
        pattern: pattern,
        maxlength: maxlength,
        minlength: minlength,
        greaterThan: greaterThan,
        greaterThanOrEqual: greaterThanOrEqual,
        lessThan: lessThan,
        lessThanOrEqual: lessThanOrEqual,
        equal: equal,
        notEqual: notEqual,
        and: and,
        or: or,
        when: when,
        matches: matches,
        inArray: inArray,
        isNotBlank: isNotBlank,
        validate: validate
    };
};
export default useValidate;
//# sourceMappingURL=use-validate.js.map