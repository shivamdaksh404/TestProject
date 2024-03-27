import {
  Image,
  Box,
  Flex,
  Spacer,
  Heading,
  Text,
  Center,
  CardBody,
  Card,
  Stack,
  WrapItem,
  Button,
  Wrap,
  Textarea,
} from "@chakra-ui/react";
import { StarIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function UserReview() {
  const buttonValue = [
    "Polite attitude",
    "Fast Service",
    "Good quality",
    "Friendliness",
    "Professionalism",
    "Cleanliness",
    "Accuracy",
  ];
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    interest: [],
    tellUsMore: "",
  });


  const handleAddInterests = (value) => {
    let newArr = reviewForm.interest;
    if (!newArr.includes(value)) {
      newArr.push(value);
    } else {
      newArr = newArr.filter((item) => item !== value);
    }
    setReviewForm({ ...reviewForm, interest: newArr });
  };
  

  const handleSubmitData=()=>{
    if(reviewForm.rating===0){
      alert( 'Please rate the profile' );
    }else if(reviewForm.interest.length<=0){
      alert('At least one category should be selected');
    }else {
        alert(`Your Review has been submitted\nRating : ${reviewForm.rating }\nInterest :${reviewForm.interest}\nExperiance : ${reviewForm.tellUsMore}`);
        setReviewForm({...reviewForm, rating : 0 , interest : [], tellUsMore : ""})
        //send data to database here
        console.log("Submitted data : ", reviewForm);
      }
  }

  return (
    <div style={{ width: "100vw" }}>
      {/* HeadSection */}
      <Box bgColor="#d0ecea" w="100%">
        <Box bgColor="#d0ecea" w="100%" p={4} color="black">
          <button>
            <ArrowBackIcon /> &nbsp; Pay Tip
          </button>
        </Box>
        <Flex px={4} py={2}>
          {/* Avatar Div */}
          <Box pe={3}>
            <Image
              borderRadius="full"
              boxSize="75px"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
            />
          </Box>

          <Box>
            <Heading pt={2} as="h6" size="sm">
              Shivam Daksh
            </Heading>
            <Text py={1} fontSize="sm">
              Developer
            </Text>
            <Text fontSize="sm">{`I'm Happy to work Here`}</Text>
          </Box>
          <Spacer />
          <Box>
            <Flex>
              <Center>
                <Heading pt={2} pe={2} as="h2" size="xl">
                  4.5
                </Heading>
              </Center>
              <Center color="yellow.500">
                <StarIcon color="" pt={2} boxSize={"35px"} />
              </Center>
            </Flex>
            <Text fontSize="sm" color={"blue"}>
              500 Reviews
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box p={4}>
        <Card>
          <CardBody p={2}>
            <Flex>
              <Box>
                <Center pt={4} ps={2}>
                  <Text fontSize="md">Rate your Experience</Text>
                </Center>
                <Center>
                  {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                      <Box
                        color={
                          ratingValue <= (hoverRating || reviewForm.rating)
                            ? "yellow.500"
                            : "lightgray"
                        }
                        key={index}
                      >
                        <StarIcon
                          pt={2}
                          boxSize={"30px"}
                          value={ratingValue}
                          onClick={() =>
                            setReviewForm({
                              ...reviewForm,
                              rating: ratingValue,
                            })
                          }
                          onMouseEnter={() => setHoverRating(ratingValue)}
                          onMouseLeave={() => setHoverRating(0)}
                        />
                      </Box>
                    );
                  })}
                </Center>
              </Box>
              <Spacer />
              <Center>
                <Image
                  py={0}
                  //borderRadius="full"
                  boxSize="100px"
                  src="review.png"
                  alt="Dan Abramov"
                />
              </Center>
            </Flex>
          </CardBody>
        </Card>
      </Box>
      <Box p={4} pt={0}>
        <Card>
          <CardBody p={2} ps={4}>
            <Text fontSize="md"> {`What did you like?`}</Text>
            <Stack py={3}>
              <Wrap spacing={2}>
                {buttonValue.map((value, index) => (
                  <WrapItem key={index}>
                    <Button
                    className="tag-button"
                      px={2}
                      py={0}
                      maxHeight={"30px"}
                      fontSize={"small"}
                      borderRadius={25}
                      colorScheme={reviewForm.interest.includes(value) ?"blue" :"gray"}
                      color={reviewForm.interest.includes(value) ?"white" :"GrayText"}
                      variant={reviewForm.interest.includes(value) ? "solid" : "outline"} 
                      onClick={() => handleAddInterests(value)}
                    >
                      {value}
                    </Button>
                  </WrapItem>
                ))}
              </Wrap>
            </Stack>
          </CardBody>
        </Card>
      </Box>
      <Box p={4} pt={0}>
        <Card>
          <CardBody p={2} ps={4}>
            <Text fontSize="md"> {`Tell us more (optional)`}</Text>
            <Textarea
              placeholder=""
              value={reviewForm.tellUsMore}
              onChange={(e) =>{
                setReviewForm({ ...reviewForm, tellUsMore: e.target.value })
              }}
            />
          </CardBody>
        </Card>
      </Box>
      <Box p={4} pt={0}>
        <Button
          w={"100%"}
          px={2}
          py={0}
          fontSize={"medium"}
          colorScheme="gray"
          color={"GrayText"}
          onClick={handleSubmitData}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}
