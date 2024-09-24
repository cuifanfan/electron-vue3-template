'use strict';
(self['webpackChunk_vue_devtools_shell_chrome'] =
    self['webpackChunk_vue_devtools_shell_chrome'] || []).push([
    [9342],
    {
        89342: (e, n, s) => {
            s.r(n), s.d(n, { conf: () => r, language: () => o });
            var t = s(82526),
                r = {
                    comments: { lineComment: '#', blockComment: ["'''", "'''"] },
                    brackets: [
                        ['{', '}'],
                        ['[', ']'],
                        ['(', ')']
                    ],
                    autoClosingPairs: [
                        { open: '{', close: '}' },
                        { open: '[', close: ']' },
                        { open: '(', close: ')' },
                        { open: '"', close: '"', notIn: ['string'] },
                        { open: "'", close: "'", notIn: ['string', 'comment'] }
                    ],
                    surroundingPairs: [
                        { open: '{', close: '}' },
                        { open: '[', close: ']' },
                        { open: '(', close: ')' },
                        { open: '"', close: '"' },
                        { open: "'", close: "'" }
                    ],
                    onEnterRules: [
                        {
                            beforeText: new RegExp(
                                '^\\s*(?:def|class|for|if|elif|else|while|try|with|finally|except|async).*?:\\s*$'
                            ),
                            action: { indentAction: t.Mj.IndentAction.Indent }
                        }
                    ],
                    folding: {
                        offSide: !0,
                        markers: {
                            start: new RegExp('^\\s*#region\\b'),
                            end: new RegExp('^\\s*#endregion\\b')
                        }
                    }
                },
                o = {
                    defaultToken: '',
                    tokenPostfix: '.python',
                    keywords: [
                        'False',
                        'None',
                        'True',
                        'and',
                        'as',
                        'assert',
                        'async',
                        'await',
                        'break',
                        'class',
                        'continue',
                        'def',
                        'del',
                        'elif',
                        'else',
                        'except',
                        'exec',
                        'finally',
                        'for',
                        'from',
                        'global',
                        'if',
                        'import',
                        'in',
                        'is',
                        'lambda',
                        'nonlocal',
                        'not',
                        'or',
                        'pass',
                        'print',
                        'raise',
                        'return',
                        'try',
                        'while',
                        'with',
                        'yield',
                        'int',
                        'float',
                        'long',
                        'complex',
                        'hex',
                        'abs',
                        'all',
                        'any',
                        'apply',
                        'basestring',
                        'bin',
                        'bool',
                        'buffer',
                        'bytearray',
                        'callable',
                        'chr',
                        'classmethod',
                        'cmp',
                        'coerce',
                        'compile',
                        'complex',
                        'delattr',
                        'dict',
                        'dir',
                        'divmod',
                        'enumerate',
                        'eval',
                        'execfile',
                        'file',
                        'filter',
                        'format',
                        'frozenset',
                        'getattr',
                        'globals',
                        'hasattr',
                        'hash',
                        'help',
                        'id',
                        'input',
                        'intern',
                        'isinstance',
                        'issubclass',
                        'iter',
                        'len',
                        'locals',
                        'list',
                        'map',
                        'max',
                        'memoryview',
                        'min',
                        'next',
                        'object',
                        'oct',
                        'open',
                        'ord',
                        'pow',
                        'print',
                        'property',
                        'reversed',
                        'range',
                        'raw_input',
                        'reduce',
                        'reload',
                        'repr',
                        'reversed',
                        'round',
                        'self',
                        'set',
                        'setattr',
                        'slice',
                        'sorted',
                        'staticmethod',
                        'str',
                        'sum',
                        'super',
                        'tuple',
                        'type',
                        'unichr',
                        'unicode',
                        'vars',
                        'xrange',
                        'zip',
                        '__dict__',
                        '__methods__',
                        '__members__',
                        '__class__',
                        '__bases__',
                        '__name__',
                        '__mro__',
                        '__subclasses__',
                        '__init__',
                        '__import__'
                    ],
                    brackets: [
                        { open: '{', close: '}', token: 'delimiter.curly' },
                        { open: '[', close: ']', token: 'delimiter.bracket' },
                        { open: '(', close: ')', token: 'delimiter.parenthesis' }
                    ],
                    tokenizer: {
                        root: [
                            { include: '@whitespace' },
                            { include: '@numbers' },
                            { include: '@strings' },
                            [/[,:;]/, 'delimiter'],
                            [/[{}\[\]()]/, '@brackets'],
                            [/@[a-zA-Z_]\w*/, 'tag'],
                            [
                                /[a-zA-Z_]\w*/,
                                { cases: { '@keywords': 'keyword', '@default': 'identifier' } }
                            ]
                        ],
                        whitespace: [
                            [/\s+/, 'white'],
                            [/(^#.*$)/, 'comment'],
                            [/'''/, 'string', '@endDocString'],
                            [/"""/, 'string', '@endDblDocString']
                        ],
                        endDocString: [
                            [/[^']+/, 'string'],
                            [/\\'/, 'string'],
                            [/'''/, 'string', '@popall'],
                            [/'/, 'string']
                        ],
                        endDblDocString: [
                            [/[^"]+/, 'string'],
                            [/\\"/, 'string'],
                            [/"""/, 'string', '@popall'],
                            [/"/, 'string']
                        ],
                        numbers: [
                            [/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, 'number.hex'],
                            [/-?(\d*\.)?\d+([eE][+\-]?\d+)?[jJ]?[lL]?/, 'number']
                        ],
                        strings: [
                            [/'$/, 'string.escape', '@popall'],
                            [/'/, 'string.escape', '@stringBody'],
                            [/"$/, 'string.escape', '@popall'],
                            [/"/, 'string.escape', '@dblStringBody']
                        ],
                        stringBody: [
                            [/[^\\']+$/, 'string', '@popall'],
                            [/[^\\']+/, 'string'],
                            [/\\./, 'string'],
                            [/'/, 'string.escape', '@popall'],
                            [/\\$/, 'string']
                        ],
                        dblStringBody: [
                            [/[^\\"]+$/, 'string', '@popall'],
                            [/[^\\"]+/, 'string'],
                            [/\\./, 'string'],
                            [/"/, 'string.escape', '@popall'],
                            [/\\$/, 'string']
                        ]
                    }
                };
        }
    }
]);
