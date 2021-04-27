import React from "react";
import { useQuery, gql } from "@apollo/client";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";
import { StyledLink } from "baseui/link";
import { format } from "date-fns";
import { Link, useHistory } from "react-router-dom";

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
  // console.log(schoolId);
  const { loading, error, data } = useQuery(SET_LIST_QUERY, {
    variables: { schoolId },
  });
  const history = useHistory();
  if (error) return <p>ERROR: {error.message}</p>;
  return (
    <TableBuilder
      data={loading ? [] : data.school.Sets}
      isLoading={loading}
      emptyMessage="No sets found!"
      overrides={{
        TableBodyRow: {
          props: {
            onDoubleClick: (e) => {
              // todo: find out if there is a better way to get the key from the event. How would I get it if it wasn't displayed to the user.
              const key =
                e.target.dataset.key || e.target.firstChild.dataset.key;
              // console.log(e);
              history.push(`/set/${key}`);
            },
          },
        },
      }}
    >
      <TableBuilderColumn header="Title">
        {(row) => (
          <StyledLink $as={Link} to={`/set/${row.Key}`} data-key={row.Key}>
            {row.Title}
          </StyledLink>
        )}
      </TableBuilderColumn>
      <TableBuilderColumn header="Key">
        {(row) => <span data-key={row.Key}>{row.Key}</span>}
      </TableBuilderColumn>
      <TableBuilderColumn header="ID">
        {(row) => <span data-key={row.Key}>{row.ID.trim()}</span>}
      </TableBuilderColumn>
      <TableBuilderColumn header="Date">
        {(row) => {
          const setDate = new Date(
            parseInt(row.Year.trim()),
            parseInt(row.Month.trim()),
            parseInt(row.Day.trim())
          );
          return (
            <span data-key={row.Key}>{format(setDate, "yyyy/MM/dd")}</span>
          );
        }}
      </TableBuilderColumn>
    </TableBuilder>
  );
};

export default SetList;
