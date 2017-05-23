# jsErrorReport
> Use `window.onerror` to catch errors, including `XMLHttpRequest` and `fetch` requests.

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