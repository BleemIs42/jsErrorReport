# jsErrorReport
> Use `window.onerror` to catch error include `XMLHttpRequest` and `fetch` request.

# Use
```javascript
    window.errorReportUrl = 'http://www.example.com'
    // send report 
    // method: 'GET'
    // data
    {
        t: '2017-05-23 ',
        url: 'page path',
        msg: 'error message',
        ua: navigator.userAgent 
    }
```