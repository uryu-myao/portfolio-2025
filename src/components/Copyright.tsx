const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <p className="text-xs">©{currentYear} Uryu Myao, All rights reserved.</p>
    </div>
  );
};

export default Copyright;
