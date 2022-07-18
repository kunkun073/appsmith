import React from "react";
import BaseControl, { ControlData, ControlProps } from "./BaseControl";

import styled from "constants/DefaultTheme";
import { ISliderProps, Slider } from "@blueprintjs/core";
import { Colors } from "constants/Colors";
import { replayHighlightClass } from "globalStyles/portals";
import { WidgetHeightLimits } from "constants/WidgetConstants";

const StyledSlider = styled(Slider)`
  &&&&& input:checked ~ span {
    background: ${Colors.GREY_10};
  }

  & input:focus + .bp3-control-indicator {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2) !important;
  }
`;

function AdsSlider(props: ISliderProps) {
  const max = (props.value || 0) + 100;
  return (
    <StyledSlider
      {...props}
      className={
        props.className
          ? props.className + " " + replayHighlightClass
          : replayHighlightClass
      }
      labelStepSize={Math.floor(max / 4)}
      max={max}
      min={4}
    />
  );
}

class SliderControl extends BaseControl<SliderControlProps> {
  render() {
    return (
      <AdsSlider
        className={this.props.propertyValue ? "checked" : "unchecked"}
        onChange={this.onToggle}
        onRelease={this.onRelease}
        value={this.props.propertyValue}
      />
    );
  }

  onToggle = (value: number) => {
    this.updateProperty(this.props.propertyName, value);
    if (this.props.onChange) {
      this.props.onChange();
    }
  };

  onRelease = () => {
    if (this.props.onRelease) {
      this.props.onRelease();
    }
  };

  static getControlType() {
    return "SLIDER";
  }

  static canDisplayValueInUI(config: ControlData, value: any): boolean {
    return value === "true" || value === "false";
  }
}

export interface SliderControlProps extends ControlProps {
  onChange?: () => void;
  onRelease?: () => void;
}

export default SliderControl;