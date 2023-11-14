type Label = {
  className: string;
  text: string;
};

const Label = ({ className, text }: Label) => {
  return (
    <>
      <label className={className}>{text}</label>
    </>
  );
};

export default Label;
