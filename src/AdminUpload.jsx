export function AdminUpload({ lang }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    const handleUpload = async () => {
        if (!file) return alert(lang === 'ka' ? "აირჩიეთ ფაილი!" : "Select a file!");
        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.url) setUrl(data.url);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
            <h2>Upload New Photo</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ margin: '20px 0' }} />
            <br />
            <button className="cta-btn" onClick={handleUpload} disabled={loading}>
                {loading ? (lang === 'ka' ? "მუშავდება..." : "Processing...") : (lang === 'ka' ? "ატვირთვა" : "Upload to Cloudinary")}
            </button>
            {url && <div style={{ marginTop: '20px' }}><p>Link: <a href={url} target="_blank" rel="noreferrer">{url}</a></p></div>}
        </div>
    );
}