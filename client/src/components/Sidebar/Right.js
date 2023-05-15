import { useSelector } from "react-redux";

import UserSuggest from "../UserSuggest/UserSuggest";

const Right = () => {
  const { suggestions } = useSelector((state) => state);

  return (
    <div className="sidebar-right col-xl-3 col-md-3 col-12">
      <UserSuggest users={suggestions.users} />
    </div>
  );
};

export default Right;
