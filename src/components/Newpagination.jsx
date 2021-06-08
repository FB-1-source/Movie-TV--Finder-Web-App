import React from "react";
import { Pagination } from "@material-ui/lab";

const Newpagination = ({ setpages, numofpages = 10 }) => {
  const handlepage = (page) => {
    setpages(page);
    window.scroll(0, 0);
  };

  return (
    <div>
      <Pagination
        count={numofpages}
        onChange={(e) => handlepage(e.target.textContent)}
        class="pa"
        size="large"
        hideNextButton
        hidePrevButton
      />
    </div>
  );
};

export default Newpagination;
