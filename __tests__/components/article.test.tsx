/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { Article } from '../../src/components/Article'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const fakeData = {
    title: 'test',
    date: '01/01/2000',
    isPublished: true,
    description: 'test component',
    slug: 'test',
    cover: 'image/test',
    fileName: 'test',
}

describe('Blog Article', () => {
    it('Should have title test on article', () => {
        useRouter.mockImplementation(() => ({
            route: '/',
            pathname: '/',
        }))

        const mockCode = `var Component=(()=>{var l=Object.create;var a=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var h=Object.getPrototypeOf,m=Object.prototype.hasOwnProperty;var c=e=>a(e,"__esModule",{value:!0});var g=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),u=(e,t)=>{c(e);for(var r in t)a(e,r,{get:t[r],enumerable:!0})},x=(e,t,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of p(t))!m.call(e,s)&&s!=="default"&&a(e,s,{get:()=>t[s],enumerable:!(r=d(t,s))||r.enumerable});return e},j=e=>x(c(a(e!=null?l(h(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);var o=g((N,i)=>{i.exports=_jsx_runtime});var k={};u(k,{default:()=>f,frontmatter:()=>_});var n=j(o()),_={title:"test",date:"12-21-2021",cover:"binary-search_kadoxg.webp",isPublished:!0,description:"test description"};function b(e={}){let{wrapper:t}=e.components||{};return t?(0,n.jsx)(t,Object.assign({},e,{children:(0,n.jsx)(r,{})})):r();function r(){let s=Object.assign({p:"p",pre:"pre",code:"code",div:"div",span:"span"},e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.p,{children:"test new article"}),\`
        \`,(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-js",children:(0,n.jsxs)(s.div,{"data-line":"1",className:"highlight-line","data-highlighted":"true",children:[(0,n.jsx)(s.span,{className:"token keyword",children:"const"})," hello ",(0,n.jsx)(s.span,{className:"token operator",children:"="})," ",(0,n.jsx)(s.span,{className:"token string",children:"'hello world'"}),\`
        \`]})})})]})}}var f=b;return k;})();
        ;return Component;`

        render(<Article code={mockCode} frontmatter={fakeData} />)

        const heading = screen.getByRole('heading', {
            name: /test/i,
        })
        const article = screen.getByText(/test new article/i)
        const code = screen.getByText(/hello world/i)

        expect(heading).toBeInTheDocument()
        expect(article).toBeInTheDocument()
        expect(code).toBeInTheDocument()
    })
})
