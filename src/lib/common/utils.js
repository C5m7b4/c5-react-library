const isUndefined = val => typeof val === "undefined";

const isFunction = val =>
  Object.prototype.toString.apply(val) === "[object Function]";

const camelCase = str => {
  return str
    .replace(/-a([a-z])/g, ($0, $1) => $1.toUpperCase())
    .replace("-", "");
};

const formatCss = props => {
  const prefixes = ["-webkit-", "-moz-", "-ms-"];

  const result = [];

  const regPrefix = /transform|transition/;

  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      const styleValue = props[key];

      if (regPrefix.test(key)) {
        for (let i = 0; i < prefixes.length; i++) {
          const stylename = camelCase(prefixes[i] + key);
          result[stylename] = styleValue.replace(regPrefix, `${prefixes[i]}$&`);
        }
      }

      result[key] = styleValue;
    }
  }

  return result;
};

const addPrefixCss = (element, props) => {
  const formatProps = formatCss(props);
  for (const key in formatProps) {
    if (formatProps.hasOwnProperty(key)) {
      element.style[key] = formatProps[key];
    }
  }
};

export { isUndefined, isFunction, camelCase, formatCss, addPrefixCss };
