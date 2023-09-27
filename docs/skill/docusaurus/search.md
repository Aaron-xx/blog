---
id: docusaurus-search
slug: /docusaurus-search
title: 搜索
authors: Aaron
---

> [搜索 | Docusaurus](https://docusaurus.io/zh-CN/docs/search) 

## [algolia](https://www.algolia.com/)

有两种方案来配置 algolia。

1. 让 Docsearch（准确来说是 [Algolia Crawler](https://crawler.algolia.com/)） 每周一次爬取你的网站（也可自行爬取），**前提是项目开源，否则收费**，好处是无需额外配置，申请比较繁琐（本博客目前采用的方式）

2. 自己运行 DocSearch 爬虫，可以随时爬取，但需要自行去注册账号和搭建爬虫环境，或者使用 Github Actions 来帮我们爬取。

### 方案1

关于申请 Algolia DocSearch 在文档中有详细介绍，主要是要申请麻烦，需要等待邮箱，并且还需要回复内容给对方进行确认。所以免费托管的 DocSearch 条件是，比较苛刻的，但申请完几乎是一劳永逸，也是我非常推荐的。如果申请成功后就可以在 [Crawler Admin Console](https://crawler.algolia.com/admin/crawlers) 中查看

![image-20220627232545640](https://img.Aaron.cn/image-20220627232545640.png)

然后将得到 algolia 的 appId，apiKey，indexName 填写到 `docusaurus.config.js` 中即可。

```javascript title='docusaurus.config.js'
algolia: {
  appId: 'GV6YN1ODMO',
  apiKey: '50303937b0e4630bec4a20a14e3b7872',
  indexName: 'Aaron',
}
```

爬取完毕后还会定时发送到你邮箱

![image-20230219144035031](https://img.Aaron.cn/image-20230219144035031.png)

### 方案2

[Run your own | DocSearch (algolia.com)](https://docsearch.algolia.com/docs/run-your-own)

因为方案1是真的难申请，极大概率会失败，无奈只能采用方案2。

首先去申请 [Algolia](https://www.algolia.com/) 账号，然后在左侧 indices 创建索引，在 API Keys 中获取 Application ID 和 API Key（注意，有两个 API KEY）

![image-20210821230135749](https://img.Aaron.cn/image-20210821230135749.png)

![image-20210821230232837](https://img.Aaron.cn/image-20210821230232837.png)

填入到 `docusaurus.config.js` 中的 API KEY 是 **Search-Only API Key**

```js
themeConfig: {
    algolia: {
      apiKey: "xxxxxxxxxxx",
      appId: "xxxxxxxxxxx",
      indexName: "Aaron",
    },
}
```

系统我选用的是 Linux，在 Docker 的环境下运行爬虫代码。不过要先 [安装 jq](https://github.com/stedolan/jq/wiki/Installation#zero-install) 我这里选择的是 0install 进行安装（安装可能稍慢），具体可以查看文档，然后在控制台查看安装结果

```
[root@kzserver Aaron.cn]# jq --version
jq-1.6
```

接着在任意目录中创建 `.env` 文件，填入对应的 APPID 和 API KEY（这里是`Admin API Key`，当时我还一直以为是 Search API Key 坑了我半天 😭）

```js
APPLICATION_ID = YOUR_APP_ID;
API_KEY = YOUR_API_KEY;
```

然后创建 `docsearch.json` 文件到项目目录下，其内容可以参考如下（将高亮部分替换成你的网站）

```json title='docsearch.json' {2-4}
{
  "index_name": "xxxx",
  "start_urls": ["https://example.com"],
  "sitemap_urls": ["https://example.com"],
  "selectors": {
    "lvl0": {
      "selector": "(//ul[contains(@class,'menu__list')]//a[contains(@class, 'menu__link menu__link--sublist menu__link--active')]/text() | //nav[contains(@class, 'navbar')]//a[contains(@class, 'navbar__link--active')]/text())[last()]",
      "type": "xpath",
      "global": true,
      "default_value": "Documentation"
    },
    "lvl1": "header h1, article h1",
    "lvl2": "article h2",
    "lvl3": "article h3",
    "lvl4": "article h4",
    "lvl5": "article h5, article td:first-child",
    "lvl6": "article h6",
    "text": "article p, article li, article td:last-child"
  },
  "custom_settings": {
    "attributesForFaceting": [
      "type",
      "lang",
      "language",
      "version",
      "docusaurus_tag"
    ],
    "attributesToRetrieve": [
      "hierarchy",
      "content",
      "anchor",
      "url",
      "url_without_anchor",
      "type"
    ],
    "attributesToHighlight": ["hierarchy", "content"],
    "attributesToSnippet": ["content:10"],
    "camelCaseAttributes": ["hierarchy", "content"],
    "searchableAttributes": [
      "unordered(hierarchy.lvl0)",
      "unordered(hierarchy.lvl1)",
      "unordered(hierarchy.lvl2)",
      "unordered(hierarchy.lvl3)",
      "unordered(hierarchy.lvl4)",
      "unordered(hierarchy.lvl5)",
      "unordered(hierarchy.lvl6)",
      "content"
    ],
    "distinct": true,
    "attributeForDistinct": "url",
    "customRanking": [
      "desc(weight.pageRank)",
      "desc(weight.level)",
      "asc(weight.position)"
    ],
    "ranking": [
      "words",
      "filters",
      "typo",
      "attribute",
      "proximity",
      "exact",
      "custom"
    ],
    "highlightPreTag": "<span class='algolia-docsearch-suggestion--highlight'>",
    "highlightPostTag": "</span>",
    "minWordSizefor1Typo": 3,
    "minWordSizefor2Typos": 7,
    "allowTyposOnNumericTokens": false,
    "minProximity": 1,
    "ignorePlurals": true,
    "advancedSyntax": true,
    "attributeCriteriaComputedByMinProximity": true,
    "removeWordsIfNoResults": "allOptional",
    "separatorsToIndex": "_",
    "synonyms": [
      ["js", "javascript"],
      ["ts", "typescript"]
    ]
  }
}
```

运行 docker 命令

```sh
docker run -it --env-file=.env -e "CONFIG=$(cat docsearch.json | jq -r tostring)" algolia/docsearch-scraper
```

接着等待容器运行，爬取你的网站即可。最终打开 algolia 控制台提示如下页面则表示成功

![image-20210821225934002](https://img.Aaron.cn/image-20210821225934002.png)

#### 使用 github-actions

因为要确保项目成功部署后才触发，如果采用 vercel 部署可以按照如下触发条件。

```yaml title='.github/workflows/docsearch.yml' 
name: docsearch

on:
  deployment

jobs:
  algolia:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Get the content of docsearch.json as config
        id: algolia_config
        run: echo "::set-output name=config::$(cat docsearch.json | jq -r tostring)"

      - name: Run algolia/docsearch-scraper image
        env:
          ALGOLIA_APP_ID: ${{ secrets.ALGOLIA_APP_ID }}
          ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
          CONFIG: ${{ steps.algolia_config.outputs.config }}
        run: |
          docker run \
            --env APPLICATION_ID=${ALGOLIA_APP_ID} \
            --env API_KEY=${ALGOLIA_API_KEY} \
            --env "CONFIG=${CONFIG}" \
            algolia/docsearch-scraper
```

添加 [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) 到你的 Github 仓库中，提交代码便可触发爬虫规则。

## 本地搜索

如果你嫌 algolia 申请比较麻烦，docusaurus 也提供本地搜索，不过搜索上肯定会比全文搜索来的差一些。

本地搜索插件：[docusaurus-search-local](https://github.com/cmfcmf/docusaurus-search-local)
