const ItemsDetails = ({ items }) => {
  if (!items) {
    return <div>Loading...</div>;
  }

  const {
    title,
    description,
    category,
    imageURL,
    status,
    location: { type: locationType, coordinates: [longitude, latitude] } = {},
  } = items;

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={imageURL || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">{title || "Unknown Title"}</h1>
          <p className="py-6">{description || "No description available."}</p>
            <p className="text-lg font-semibold">Category: {category || "Uncategorized"}</p>
            <p className="text-lg font-semibold">Status: {status || "Unknown"}</p>
            <p className="text-lg font-semibold">
                Location: {locationType || "Unknown"} (Lat: {latitude?.toFixed(3) || "N/A"}, Long: {longitude?.toFixed(3) || "N/A"})
            </p>
          <div className="card-actions mt-4">
            <button className="btn btn-secondary mr-2">Contact Owner</button>
            <button className="btn btn-accent">Report Issue</button>
            </div>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default ItemsDetails;