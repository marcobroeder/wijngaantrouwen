export const sendXHR = {
  methods: {
    sendXHR (method, url, body) {
      // Do form post call using XHR
      var xhr = new XMLHttpRequest()
      xhr.open(method, url)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

      // Callback for form post reply
      xhr.onreadystatechange = () => {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText).result === 'success') {
            this.onSuccess()
            return
          }
          if (JSON.parse(xhr.responseText).result === 'error') {
            this.onError(JSON.parse(xhr.responseText).error)
          }
        }
      }

      // url encode form data for sending as post data
      var encoded = Object.keys(body).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(body[k])
      }).join('&')

      // Post the form
      xhr.send(encoded)
    }
  }
}
