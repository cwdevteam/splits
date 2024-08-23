import { jsx as _jsx } from "react/jsx-runtime";
export default function Link(_a) {
    var href = _a.href, children = _a.children, className = _a.className;
    return (_jsx("a", { href: href, target: "_blank", rel: "noopener noreferrer", className: "hover:underline ".concat(className), children: children }));
}
