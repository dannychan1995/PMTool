import React from 'react';

import { TouchableOpacity, Platform } from "react-native";
import { Icon } from 'native-base';

export class TodoCheckBox extends React.Component {
  render() {
    return (
			<TouchableOpacity>
				<Icon
          active
					style={{
						color: this.props.checked === true ? "green" : "transparent",
						fontSize: 30,
						lineHeight: 25,
						marginTop: 10,
						marginLeft: 10,
						marginRight: 10,
					}}
					name={Platform.OS === "ios" ? "ios-checkmark" : "md-checkmark"}
				/>
			</TouchableOpacity>
		);
  }
}
