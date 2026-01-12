export const TabTypes = {
  type: { id: "type", name: "攻击类型" },
  request: { id: "request", name: "请求" },
  payload: { id: "payload", name: "载荷" },
  options: { id: "options", name: "设置" },
  response: { id: "response", name: "结果" },
} as const;

export const ComparisonId = { Equal: "equal", NoEqual: "no_equal" };
export const Comparison = [
  { id: ComparisonId.Equal, name: "等于" },
  { id: ComparisonId.NoEqual, name: "不等于" },
];
