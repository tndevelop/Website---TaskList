import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const filterNames = ["All", "Important", "Today", "Next7", "Private"];

function FilterList(props) {
  return (
    <ListGroup variant="flush">
      {filterNames.map((name, index) => (
        <Link key={index} to={name}>
          <ItemSide
            name={name}
            index={index}
            key={index}
            selectedFilter={name === props.selectedItem}
            setFilter={props.setFilter}
          />
        </Link>
      ))}
    </ListGroup>
  );
}

function ItemSide(props) {
  return props.selected ? (
    <ListGroup.Item action active>
      {props.name}
    </ListGroup.Item>
  ) : (
    <ListGroup.Item action onClick={() => props.setFilter(props.name)}>
      {props.name}
    </ListGroup.Item>
  );
}

export { FilterList, filterNames };
