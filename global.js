// Define main function (script entry)
function main(config, profileName) {
  const prependRules = [
    'DOMAIN-SUFFIX,bing.com,DIRECT',
    'DOMAIN-KEYWORD,gcp,🤖 AI',
    'DOMAIN-KEYWORD,doubleclick,🤖 AI',
    'DOMAIN-KEYWORD,google,🤖 AI',
  ];

  // 过滤 config.rules，移除与 prependRules 冲突的规则
  config.rules = config.rules.filter(rule => {
    // 拆分当前规则，获取类型和匹配值（前两个元素）
    const [ruleType, ruleValue] = rule.split(',').map(item => item.trim());
    
    // 检查是否与 prependRules 中的规则冲突
    return !prependRules.some(pendingRule => {
      // 拆分前置规则，获取类型和匹配值（前两个元素）
      const [pendingType, pendingValue] = pendingRule.split(',').map(item => item.trim());
      // 类型和匹配值都相同则视为冲突
      return pendingType === ruleType && pendingValue === ruleValue;
    });
  });

  // 将前置规则添加到原有规则前面
  config.rules = prependRules.concat(config.rules);

  return config;
}
