/***** get IP from cloudflare method *****/
export default async function getClientIp(rountingNumber) {
  try {
    let ipResponse = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
    ipResponse = await ipResponse.text();
    let ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
    return ipResponse.match(ipRegex)[0] ?? '127.0.0.1';
  } catch (err) {
    return '127.0.0.1';
  }
}