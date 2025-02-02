const currentUrl = window.location.href;

const everything = currentUrl.split("?");

let formData = everything[1].split("&");

function show(cup) {
    console.log(cup);
    formData.forEach((element) => {
        if (element.startsWith(cup)) {
            console.log(element)
            result = element.split("=")[1].replace("%40", "@").replaceAll("+", " ").replace("%2B", "+");
            console.log(result)
        }
    });
    return (result);
}

const showInfo = document.querySelector("#results");
showInfo.innerHTML = `
<p>Name: ${show("firstName")} ${show("lastName")}</p>
<p>Title: ${show("orgTitle")}</p>
<p>Email: <a href="${show("email")}"target="_blank">${show("email")}</a></p>
<p>Your Phone: ${show("phone")}</p>
<p>Business/Organization Name: ${show("orgName")}</p>
<p>Membership Level: ${show("membershipLevel")}</p>
<p>Description: ${show("description")}</p>
<p>Data joined: ${show("timestamp")}</p>
`;