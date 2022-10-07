'use strict';

const types = require('./types');

module.exports = {
  insertImportDeclaration,
  removeCommaSeparatedNode,
};

function removeCommaSeparatedNode(node, sourceCode, fixer) {
  const tokenBefore = sourceCode.getTokenBefore(node);
  const tokenAfter = sourceCode.getTokenAfter(node);

  const removeComma = types.isCommaToken(tokenAfter)
    ? fixer.remove(tokenAfter)
    : fixer.remove(tokenBefore);
  const removeNode = fixer.remove(node);

  return [removeComma, removeNode];
}

function insertImportDeclaration(sourceCode, fixer, source, specifier, defaultSpecifier) {
  return fixer.insertTextBefore(
    sourceCode.ast,
    `import ${defaultSpecifier ? `${defaultSpecifier}, ` : ''}{ ${specifier} } from '${source}';\n`
  );
}
