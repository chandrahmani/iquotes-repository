export const SubHeader = ({ title, description, children }) => {
  return (
    <div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};
