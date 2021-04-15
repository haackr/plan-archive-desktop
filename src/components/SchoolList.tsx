import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Select, SIZE, Value } from "baseui/select";
import SetList from "./SetList";
import { useHistory, useParams } from "react-router-dom";

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
  const params: any = useParams();
  console.log(params);
  const [schoolListValue, setSchoolListValue] = useState<Value>([]);
  const { loading, error, data } = useQuery(SCHOOLS_QUERY);
  let history = useHistory();
  if (error) return <div>ERROR: {error.message}</div>;
  // console.log(schoolListValue);
  return (
    <div>
      <Select
        isLoading={loading}
        options={
          loading
            ? []
            : data.schools.map((school: School) => ({
                label: `${school.SchoolID} - ${school.SchoolName}`,
                id: school.id as number,
              }))
        }
        value={schoolListValue}
        onChange={({ value }) => {
          console.log(value);
          setSchoolListValue(value);
          history.push(`/school/${value[0].id}/`);
          console.log(history);
        }}
        placeholder="Select Location"
        searchable
        size={SIZE.large}
        autoFocus
        disabled={loading}
      />
      {/* <Button
        disabled={loading || schoolListValue.length === 0}
        isLoading={loading}
      >
        GO!
      </Button> */}
      {(schoolListValue.length !== 0 || params.id) && (
        <SetList
          schoolId={
            schoolListValue[0] ? schoolListValue[0].id : parseInt(params.id)
          }
        />
      )}
    </div>
  );
};

export default SchoolList;
