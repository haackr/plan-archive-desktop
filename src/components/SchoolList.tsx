import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Select, SIZE, Value } from "baseui/select";

const SCHOOLS_QUERY = gql`
  query SCHOOLS_QUERY {
    schools {
      id
      SchoolID
      SchoolName
    }
  }
`;

type School = {
  id: number;
  SchoolName: string;
  SchoolID: string;
};

const SchoolList: React.FC = () => {
  const [schoolListValue, setSchoolListValue] = useState<Value>();
  const { loading, error, data } = useQuery(SCHOOLS_QUERY);
  if (error) return <div>ERROR: {error.message}</div>;
  return (
    <Select
      isLoading={loading}
      options={
        loading
          ? []
          : data.schools.map((school: School) => ({
              label: `${school.SchoolID} - ${school.SchoolName}`,
              id: school.id,
            }))
      }
      value={schoolListValue}
      onChange={({ value }) => setSchoolListValue(value)}
      placeholder="Select Location"
      searchable
      size={SIZE.large}
      autoFocus
      disabled={loading}
    />
  );
};

export default SchoolList;
