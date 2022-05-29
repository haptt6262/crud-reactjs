export default function addItem(data) {
    return new Promise((resolve, reject) => {
        const url = `http://localhost:3001/items/${data.id}`

        fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ name: data.name })
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}