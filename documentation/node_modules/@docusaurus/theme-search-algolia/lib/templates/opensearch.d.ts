/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare const _default: "\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<OpenSearchDescription xmlns=\"http://a9.com/-/spec/opensearch/1.1/\"\n                       xmlns:moz=\"http://www.mozilla.org/2006/browser/search/\">\n  <ShortName><%= it.title %></ShortName>\n  <Description>Search <%= it.title %></Description>\n  <InputEncoding>UTF-8</InputEncoding>\n  <% if (it.favicon) { _%>\n    <Image width=\"16\" height=\"16\" type=\"image/x-icon\"><%= it.favicon %></Image>\n  <% } _%>\n  <Url type=\"text/html\" method=\"get\" template=\"<%= it.url %>search?q={searchTerms}\"/>\n  <Url type=\"application/opensearchdescription+xml\" rel=\"self\" template=\"<%= it.url %>opensearch.xml\" />\n  <moz:SearchForm><%= it.url %></moz:SearchForm>\n</OpenSearchDescription>\n";
export default _default;
