import React from 'react';

/**
 * RuleTable: lightweight wrapper for dense evaluation-rule tables.
 * Use in MDX as:
 * <RuleTable>
 *   <table>...</table>
 * </RuleTable>
 */
export default function RuleTable({children}) {
  return <div className="rule-table-wrap">{children}</div>;
}
