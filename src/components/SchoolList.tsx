import React from "react";
import { useQuery, gql } from "@apollo/client";

const SCHOOLS_QUERY = gql`
  query SCHOOLS_QUERY {
    schools {
      id
      SchoolID
      SchoolName
    }
  }
`;

const SchoolList = () => {
  const { loading, error, data } = useQuery(SCHOOLS_QUERY);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>ERROR: {error.message}</div>;
  return (
    <div>
      <ul>
        {data.schools.map((school: any) => (
          <li key={school.id}>
            {school.SchoolID} - {school.SchoolName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolList;
