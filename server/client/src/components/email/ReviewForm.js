import { Rating } from "./Rating";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

const ReviewForm = (props) => {
  const history = useHistory();
  const [text, setText] = useState("");
  const { id } = useParams();

  const handleSend = async () => {
    props.setSent(true);
    try {
      await axios.post("/api/send_mail", { text, id });
      history.push("/user/orders");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form {...props}>
      <Stack spacing="6">
        <FormControl id="rating">
          <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
            Rating
          </FormLabel>
          <Rating defaultValue={2} size="xl" />
        </FormControl>

        <FormControl id="comment">
          <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
            Comment
          </FormLabel>
          <Textarea
            name="comment"
            placeholder="Your comment"
            rows={4}
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            resize="none"
            value={props.text}
            onChange={(e) => setText(e.target.value)}
          />
        </FormControl>

        <Button
          type="button"
          colorScheme="blue"
          alignSelf="start"
          size="lg"
          onClick={handleSend}
        >
          Submit review
        </Button>
      </Stack>
    </form>
  );
};

export default ReviewForm;
