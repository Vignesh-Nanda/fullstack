const Card = () => {
  const cards = [
    {
      imageUrl: "/src/Image/c2.jpg",
      name: "Introduction to Yoga Philosophy and Practice",
      description:
        "This is the first impressive card component with an image, description, and button.",
      buttonText: "Learn More 1",
      link: "/login",
    },
    {
      imageUrl: "/src/Image/c3.jpg",
      name: "Hatha Yoga Teacher Training Program",
      description:
        "This is the second impressive card component with an image, description, and button.",
      buttonText: "Learn More 2",
      link:"/profile"
    },
    {
      imageUrl: "/src/Image/c4.jpg",
      name: "Advanced Asanas and Alignment Techniques",
      description:
        "This is the third impressive card component with an image, description, and button.",
      buttonText: "Learn More 3",
    },
    {
      imageUrl: "/src/Image/c2.jpg",
      name: "Yoga Anatomy and Physiology",
      description:
        "This is the third impressive card component with an image, description, and button.",
      buttonText: "Learn More 3",
    },
    {
      imageUrl: "/src/Image/c1.jpg",
      name: "Meditation and Mindfulness Practices",
      description:
        "This is the third impressive card component with an image, description, and button.",
      buttonText: "Learn More 3",
    },
    {
      imageUrl: "/src/Image/c5.jpg",
      name: "Pranayama: The Science of Breath Control",
      description:
        "This is the third impressive card component with an image, description, and button.",
      buttonText: "Learn More 3",
    },
  ];

  return (
    <div
      className="card-container"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "20px",
        padding: "50px",
        background:
          "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),url('/src/Image/logo.jpg')", // Apply background image here
        backgroundSize: "cover",
        paddingTop: "7rem",
      }}
    >
      {cards.map((card, index) => (
        <a
          key={index}
          href={card.link}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              position: "relative",
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "white",
              height: "100%",
            }}
          >
            <img
              src={card.imageUrl}
              alt={card.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "20px" }}>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
                {card.name}
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#666",
                  marginBottom: "20px",
                }}
              >
                {card.description}
              </p>
              <button
                style={{
                  border: "none",
                  color: "black",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  fontSize: "16px",
                  margin: "4px 2px",
                  cursor: "pointer",
                }}
              >
                {card.buttonText}
              </button>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Card;
