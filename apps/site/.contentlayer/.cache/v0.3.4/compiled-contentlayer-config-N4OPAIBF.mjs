// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkSlug from "remark-slug";

// lib/rehype-highlight-code.js
import { toString as nodeToString } from "hast-util-to-string";
import parseNumericRange from "parse-numeric-range";
import { refractor } from "refractor/lib/all.js";
import { visit } from "unist-util-visit";

// lib/rehype-highlight-line.js
import { toHtml as hastToHtml } from "hast-util-to-html";
import parse from "rehype-parse";
import { unified } from "unified";
var lineNumberify = (ast, lineNum = 1) => {
  let lineNumber = lineNum;
  return ast.reduce(
    (result, node) => {
      if (node.type === "text") {
        if (node.value.indexOf("\n") === -1) {
          node.lineNumber = lineNumber;
          result.nodes.push(node);
          return result;
        }
        const lines = node.value.split("\n");
        for (let i = 0; i < lines.length; i++) {
          if (i !== 0)
            ++lineNumber;
          if (i === lines.length - 1 && lines[i].length === 0)
            continue;
          result.nodes.push({
            type: "text",
            value: i === lines.length - 1 ? lines[i] : `${lines[i]}
`,
            lineNumber
          });
        }
        result.lineNumber = lineNumber;
        return result;
      }
      if (node.children) {
        node.lineNumber = lineNumber;
        const processed = lineNumberify(node.children, lineNumber);
        node.children = processed.nodes;
        result.lineNumber = processed.lineNumber;
        result.nodes.push(node);
        return result;
      }
      result.nodes.push(node);
      return result;
    },
    { nodes: [], lineNumber }
  );
};
var wrapLines = (ast, linesToHighlight) => {
  const highlightAll = linesToHighlight.length === 1 && linesToHighlight[0] === 0;
  const allLines = Array.from(new Set(ast.map((x) => x.lineNumber)));
  let i = 0;
  const wrapped = allLines.reduce((nodes, marker) => {
    const line = marker;
    const children = [];
    for (; i < ast.length; i++) {
      if (ast[i].lineNumber < line) {
        nodes.push(ast[i]);
        continue;
      }
      if (ast[i].lineNumber === line) {
        children.push(ast[i]);
        continue;
      }
      if (ast[i].lineNumber > line) {
        break;
      }
    }
    nodes.push({
      type: "element",
      tagName: "div",
      properties: {
        dataLine: line,
        className: "highlight-line",
        dataHighlighted: linesToHighlight.includes(line) || highlightAll ? "true" : "false"
      },
      children,
      lineNumber: line
    });
    return nodes;
  }, []);
  return wrapped;
};
var MULTILINE_TOKEN_SPAN = /<span class="token ([^"]+)">[^<]*\n[^<]*<\/span>/g;
var applyMultilineFix = (ast) => {
  let html = hastToHtml(ast);
  html = html.replace(
    MULTILINE_TOKEN_SPAN,
    (match, token) => match.replace(/\n/g, `</span>
<span class="token ${token}">`)
  );
  const hast = unified().use(parse, { emitParseErrors: true, fragment: true }).parse(html);
  return hast.children;
};
var highlightLine = (ast, lines) => {
  const formattedAst = applyMultilineFix(ast);
  const numbered = lineNumberify(formattedAst).nodes;
  return wrapLines(numbered, lines);
};

// lib/rehype-highlight-word.js
import { toHtml as hastToHtml2 } from "hast-util-to-html";
import parse2 from "rehype-parse";
import { unified as unified2 } from "unified";
var CALLOUT = /__(.*?)__/g;
var highlightWord = (code) => {
  const html = hastToHtml2(code);
  const result = html.replace(
    CALLOUT,
    (_, text) => `<span class="highlight-word">${text}</span>`
  );
  const hast = unified2().use(parse2, { emitParseErrors: true, fragment: true }).parse(result);
  return hast.children;
};

// lib/rehype-highlight-code.js
var rehypeHighlightCode = () => {
  const visitor = (node, _index, parentNode) => {
    if (parentNode.tagName === "pre" && node.tagName === "code") {
      const lang = node.properties.className ? node.properties.className[0].split("-")[1] : "md";
      const registeredLanguages = refractor.listLanguages();
      if (!registeredLanguages.includes(lang))
        return;
      let result = refractor.highlight(nodeToString(node), lang);
      const linesToHighlight = parseNumericRange(node.properties.line || "0");
      result = highlightLine(result, linesToHighlight);
      const shouldIgnoreWordHighlight = typeof node.properties.ignoreWordHighlight !== "undefined";
      if (!shouldIgnoreWordHighlight) {
        result = highlightWord(result);
      }
      node.children = result;
    }
  };
  return (tree) => {
    visit(tree, "element", visitor);
  };
};

// lib/rehype-meta-attribute.js
import { visit as visit2 } from "unist-util-visit";
var re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;
var rehypeMetaAttribute = () => {
  return (tree) => {
    visit2(tree, "element", visitor);
  };
  function visitor(node, _index, parentNode) {
    let match;
    if (node.tagName === "code" && node.data && node.data.meta) {
      re.lastIndex = 0;
      while (match = re.exec(node.data.meta)) {
        node.properties[match[1]] = match[2] || match[3] || match[4] || "";
        parentNode.properties[match[1]] = match[2] || match[3] || match[4] || "";
      }
    }
  }
};

// contentlayer.config.ts
var Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: "**/docs/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: false
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(2).join("/")
    },
    locale: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFilePath.split("/")[0]
    }
  }
}));
var Guide = defineDocumentType(() => ({
  name: "Guide",
  filePathPattern: "**/guides/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    image: {
      type: "string",
      required: false
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (guide) => guide._raw.flattenedPath.split("/").slice(2).join("/")
    },
    locale: {
      type: "string",
      resolve: (guide) => guide._raw.sourceFilePath.split("/")[0]
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "data",
  documentTypes: [Doc, Guide],
  mdx: {
    remarkPlugins: [remarkSlug],
    rehypePlugins: [rehypeMetaAttribute, rehypeHighlightCode]
  }
});
export {
  Doc,
  Guide,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-N4OPAIBF.mjs.map
