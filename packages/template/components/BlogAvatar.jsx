export function BlogAuthor({ name, avatar }) {
  return (
    <div>
      <p>{name}</p>
      {avatar && <img src={avatar} alt={name} />}
    </div>
  );
}
