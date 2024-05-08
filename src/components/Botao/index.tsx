import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import {colors} from '../../styles/styles';

interface IBotao {
  icon?: ImageSourcePropType | undefined;
  title?: string;
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle | ViewStyle[];
  shadow?: boolean;
}

const BotaoContainer = styled(TouchableOpacity)<IBotao>`
  width: 100%;
  height: 50px;
  border-radius: 30px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${props => props.backgroundColor || colors.primary};

  ${props =>
    props.shadow &&
    css`
      shadow-color: #000000;
      shadow-offset: 0px 2px; /* Corrigindo a sintaxe do shadow-offset */
      shadow-opacity: 0.25;
      shadow-radius: 4px; /* Adicionando "px" como unidade */
      elevation: 5;
    `}
`;

const Texto = styled(Text)<IBotao>`
  color: ${props => props.textColor || colors.lighter};
  font-size: 20px;
  font-weight: 500;
`;

const Icone = styled(Image)`
  width: 25px;
  height: 25px;
`;

export default ({
  icon,
  title = 'Botao',
  onPress,
  backgroundColor,
  textColor,
  style,
  shadow,
}: IBotao) => {
  return (
    <BotaoContainer
      style={style}
      shadow={shadow}
      onPress={onPress}
      backgroundColor={backgroundColor}>
      {icon && <Icone source={icon} />}
      <Texto textColor={textColor}>{title}</Texto>
    </BotaoContainer>
  );
};
