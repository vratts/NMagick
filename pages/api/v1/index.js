export default function (req, res) {
    res.json({
        status: 'success',
        date: new Date().toLocaleString(),
        message: 'NM is Running'
    })
}