export default function redirectToMercadoPago (preferenceId) {
    console.log("PREFERENCE "+preferenceId);
    const loadScript = (url, callback) => {
      let script = document.createElement('script');
      script.type = 'text/javascript';
  
      if (script.readyState) {
        script.onreadystatechange = () => {
          if (
            script.readyState === 'loaded' ||
            script.readyState === 'complete'
          ) {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        script.onload = () => callback();
      }
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);
    };
  
    const handleScriptLoad = () => {
      const key = process.env.mercadopago.publicKey;
      console.log(key);
      const mp = new window.MercadoPago(key, {
        locale: 'es-AR'
      });
      mp.checkout({
        preference: {
          id: preferenceId
        },
        theme: {
          elementsColor: '#c0392b'
        },
        autoOpen: true
      });
    };
  
    const sdk = process.env.mercadopago.sdk;
    console.log(sdk);
    loadScript(sdk, handleScriptLoad);
  };