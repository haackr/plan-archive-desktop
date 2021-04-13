import React from "react";
import { useQuery, gql } from "@apollo/client";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";
import { format } from "date-fns";
import { Link } from "react-router-dom";

type SetListProps = {
  schoolId: number;
};

const SET_LIST_QUERY = gql`
  query SET_LIST_QUERY($schoolId: Int!) {
    school(where: { id: $schoolId }) {
      Sets {
        ID
        Key
        Title
        Year
        Month
        Day
      }
    }
  }
`;

const SetList: React.FC<SetListProps> = ({ schoolId }) => {
  console.log(schoolId);
  const { loading, error, data } = useQuery(SET_LIST_QUERY, {
    variables: { schoolId },
  });
  if (error) return <p>ERROR: {error.message}</p>;
  return (
    <TableBuilder
      data={loading ? [] : data.school.Sets}
      isLoading={loading}
      emptyMessage="No sets found!"
    >
      <TableBuilderColumn header="Title">
        {(row) => <Link to="/set/">{row.Title}</Link>}
      </TableBuilderColumn>
      <TableBuilderColumn header="Key">{(row) => row.Key}</TableBuilderColumn>
      <TableBuilderColumn header="ID">
        {(row) => row.ID.trim()}
      </TableBuilderColumn>
      <TableBuilderColumn header="Date">
        {(row) => {
          const setDate = new Date(
            parseInt(row.Year.trim()),
            parseInt(row.Month.trim()),
            parseInt(row.Day.trim())
          );
          return format(setDate, "yyyy/MM/dd");
        }}
      </TableBuilderColumn>
    </TableBuilder>
  );
};

export default SetList;
