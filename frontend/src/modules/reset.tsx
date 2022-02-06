import { Global, css } from '@emotion/react'
import * as React from 'react'

const global = css`
    /*
  YUI 3.18.1 (build f7e7bcb)
  Copyright 2014 Yahoo! Inc. All rights reserved.
  Licensed under the BSD License.
  http://yuilibrary.com/license/
  */

    html {
        color: #000;
        background: #fff;
    }
    body,
    div,
    dl,
    dt,
    dd,
    ul,
    ol,
    li,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    pre,
    code,
    form,
    fieldset,
    legend,
    input,
    textarea,
    p,
    blockquote,
    th,
    td {
        margin: 0;
        padding: 0;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    fieldset,
    img {
        border: 0;
    }
    address,
    caption,
    cite,
    code,
    dfn,
    em,
    strong,
    th,
    var {
        font-style: normal;
        font-weight: normal;
    }
    ol,
    ul {
        list-style: none;
    }
    caption,
    th {
        text-align: left;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-size: 100%;
        font-weight: normal;
    }
    q:before,
    q:after {
        content: '';
    }
    abbr,
    acronym {
        border: 0;
        font-variant: normal;
    }
    sup {
        vertical-align: text-top;
    }
    sub {
        vertical-align: text-bottom;
    }
    input,
    textarea,
    select {
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        font-size: 100%;
    }
    legend {
        color: #000;
    }
    #yui3-css-stamp.cssreset {
        display: none;
    }
`

export const Component = () => {
    return <Global styles={global} />
}
