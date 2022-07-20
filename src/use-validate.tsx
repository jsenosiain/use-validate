import _ from "lodash";

type ValidationError = {
  id: string;
  msg: string;
}

const useValidate = (initial: any) => {	
	/** helpers */
	const isBlank = (d: any): boolean => (d === null || d === undefined || d === '');	
	const isEmpty = (d: any[]): boolean => Array.isArray(d) && d.length === 0;
	const isPristine = (d: any): boolean => _.isEqual(d, initial);
	const includes = (d: string | any[], val: any): boolean => d.length > 0 && d.indexOf(val) !== -1;
	const hasPattern = (d: string, regex: RegExp): boolean => !!d && regex.test(d);
	const hasMaxLength = (d: string, length: number): boolean => !!d && d.length <= length;
	const hasMinLength = (d: string, length: number): boolean => !!d && d.length >= length;
	
	/** validators */
	const required = (id: string, msg: string) => (d: any) => isBlank(d[id]) ? { id, msg } : null;
	const empty = (id: string, msg: string) => (d: any) => isEmpty(d[id]) ? { id, msg } : null;
  const notEmpty = (id: string, msg: string) => (d: any) => !isEmpty(d[id]) ? { id, msg } : null;
  const contains = (id: string, val: any, msg: string = '') => (d: any) => includes(d[id], val) ? { id, msg } : null;
	const pattern = (id: string, regex: RegExp, msg: string) => (d: any) => !hasPattern(d[id], regex) ? { id, msg } : null;
  const minlength = (id: string, n: number, msg: string) => (d: any) => !hasMinLength(d[id], n) ? { id, msg } : null;
  const maxlength = (id: string, n: number, msg: string) => (d: any) => !hasMaxLength(d[id], n) ? { id, msg } : null;
	const greaterThan = (id: string, n: number, msg: string) => (d: any) => (n >= parseInt(d[id], 10)) ? { id, msg } : null;
  const greaterThanOrEqual = (id: string, n: number, msg: string) => (d: any) => (n > parseInt(d[id], 10)) ? { id, msg } : null;
  const lessThan = (id: string, n: number, msg: string) => (d: any) => (n <= parseInt(d[id], 10)) ? { id, msg } : null;
  const lessThanOrEqual = (id: string, n: number, msg: string) => (d: any) => (n < parseInt(d[id], 10)) ? { id, msg } : null;
  const equal = (id: string, val: any, msg: string) => (d: any) => (val !== d[id]) ? { id, msg } : null;
	const notEqual = (id: string, val: any, msg: string) => (d: any) => (val === d[id]) ? { id, msg } : null;
		
	/** composites */
  const and = (...rules: any[]) => (d: any): any|void => {
    let result: ValidationError;

    for (let i = 0, l = rules.length; i < l; ++i) {
      result = rules[i](d);

      if (result) {
        return result;
      }
    }
  };
  const or = (...rules: any[]) => (d: any) => {
    let result: ValidationError | null = null;

		// needs a refactor
		for (let i = 0, l = rules.length; i < l; ++i) {
      result = rules[i](d);

			if (!result) {
        // @ts-ignore
				return;
      }
    }

    return result;
  };

  /** conditional */
  const when = (pred: any, rule: any) => (d: any) => pred(d) ? rule(d) : null;
	
  /** conditional - predicates */
  const matches = (id: string, regex: RegExp) => (d: any) => hasPattern(d[id], regex);
  const inArray = (id: string, arr: string | any[]) => (d: any) => arr.indexOf(d[id]) !== -1;
	const isNotBlank = (value: number) => (): boolean => !isBlank(value);
	
	/** execution */
	const validate = (validators: any[], data: any) => {
    if (!Array.isArray(validators)) {
      throw new Error('validate expects rules to be an array, was ' + typeof validators);
    }

    const tmp: any = {};

    return validators.reduce((errors, validator) => {
      const error = validator(data);

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
		isBlank,
		isEmpty,
		isPristine,
		includes,
		hasPattern,
		hasMaxLength,
		hasMinLength,
	
		required,
		empty, 
		notEmpty,
		contains,
		pattern,
		maxlength,
		minlength,
		greaterThan,
		greaterThanOrEqual,
		lessThan,
		lessThanOrEqual,
		equal,
		notEqual,		
		
		and,
		or,
		
		when,		
		matches,
		inArray,
		isNotBlank,
		
		validate
	};
};

export default useValidate;