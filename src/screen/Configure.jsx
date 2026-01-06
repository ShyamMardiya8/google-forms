import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { defaultFormConfigs } from "../formConstants/configConstant";
import { CirclePlus } from "lucide-react";
import { generateRandomId } from "../helpers/index";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";

const grid = 8;

const getListStyle = (isDraggingOver) => ({
  // background: isDraggingOver
  //   ? "linear-gradient(145deg, #eef6ff, #ffffff)"
  //   : "linear-gradient(145deg, #f8fafc, #ffffff)",
  padding: 16,
  width: 300,
  minHeight: 450,
  borderRadius: 16,
  // border: isDraggingOver ? "2px dashed #3b82f6" : "1px solid #e5e7eb",
  boxShadow: isDraggingOver
    ? "0 20px 40px rgba(59, 130, 246, 0.15)"
    : "0 10px 25px rgba(0, 0, 0, 0.08)",
  backdropFilter: "blur(6px)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  marginBottom: grid * 1.5,

  // background: isDragging
  //   ? "linear-gradient(135deg, #ecfeff, #ffffff)"
  //   : "#ffffff",

  borderRadius: 14,
  // border: isDragging ? "1.5px solid #3b82f6" : "1px solid #e5e7eb",

  boxShadow: isDragging
    ? "0 20px 40px rgba(59, 130, 246, 0.25)"
    : "0 6px 16px rgba(0, 0, 0, 0.08)",

  transform: isDragging ? "scale(1.03)" : "scale(1)",
  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",

  cursor: isDragging ? "grabbing" : "grab",

  display: "flex",
  justifyContent: "space-between", // ✅ FIXED
  alignItems: "center",
  gap: 12,

  ...draggableStyle,
});

const DefaultFormElement = ({
  handleDragEnd,
  defaultFormElement,
  setSelectedFormElement,
}) => {
  return (
    <Droppable droppableId="defaultElement" isDropDisabled={true}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {defaultFormElement.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  <span style={{ fontWeight: 500 }}>{item.label}</span>

                  <CirclePlus
                    size={18}
                    style={{
                      color: "#3b82f6",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setSelectedFormElement((prev) => [...prev, item])
                    }
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const SelectedDefaultFormElement = ({ handleDragEnd, selectedFormElement }) => {
  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <Droppable droppableId="selectedFormElement">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {selectedFormElement.map((Item, index) => {
            const dragId = `element${Item?.id}`;
            const sectionId = `section${Item.id}`;
            return (
              <Draggable key={dragId} draggableId={dragId} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <Accordion
                      style={{
                        width: "100%",
                      }}
                    >
                      {/* <span style={{ fontWeight: 500 }}>{Item.label}</span> */}
                      <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                        <Typography component="span">{Item.label}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Item.ConfigureComponent
                          sectionIndex={sectionId}
                          initData={Item.initData}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const PreviewElement = ({ selectedFormElement }) => {
  console.log("selectedFormElement", selectedFormElement);
  return (
    <div
      style={{
        height: "500px",
        background: "lightgrey",
        borderRadius: "20px",
        width: "300px",
      }}
    >
      {selectedFormElement.map((Item, index) => (
        <Item.PreviewComponent />
      ))}
    </div>
  );
};
const Configure = () => {
  const [defaultFormElement, setDefaultFormElement] =
    useState(defaultFormConfigs);
  const [selectedFormElement, setSelectedFormElement] = useState([]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const list =
        source.droppableId === "defaultElement" && selectedFormElement.length
          ? Array.from(defaultFormElement)
          : Array.from(selectedFormElement);
      const [moved] = list.splice(source.index, 1);
      list.splice(destination.index, 0, moved);
      source.droppableId === "defaultElement" && selectedFormElement.length
        ? setDefaultFormElement(list)
        : setSelectedFormElement(list);
    } else {
      let sourceList =
        source.droppableId === "defaultElement"
          ? Array.from(defaultFormElement)
          : Array.from(SelectedDefaultFormElement);

      let destinationList =
        destination.droppableId === "defaultElement"
          ? Array.from(defaultFormElement)
          : Array.from(selectedFormElement);

      const [moved] = sourceList.splice(source.index, 1);
      destinationList.splice(destinationList.index, 0, moved);

      setSelectedFormElement(sourceList);
      setSelectedFormElement(destinationList);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              marginRight: "40px",
            }}
          >
            <DefaultFormElement
              handleDragEnd={onDragEnd}
              defaultFormElement={defaultFormElement}
              setDefaultFormElement={setDefaultFormElement}
              setSelectedFormElement={setSelectedFormElement}
            />
          </div>
          <div
            style={{
              marginRight: "40px",
            }}
          >
            <SelectedDefaultFormElement
              selectedFormElement={selectedFormElement}
              handleDragEnd={onDragEnd}
            />
          </div>
          <div
            style={{
              marginRight: "40px",
            }}
          >
            <PreviewElement selectedFormElement={selectedFormElement} />
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default Configure;
