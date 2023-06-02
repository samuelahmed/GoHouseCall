import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

const potentialCaregiver = [
  {
    id: 1,
    name: "Bill Gates",
    status: "applied",
    note: "I would love to help you out with your house chores",
  },
  {
    id: 2,
    name: "Mark Zuckerberg",
    status: "applied",
    note: "I have a passion for organizing things and would be happy to assist with your household tasks.",
  },
  {
    id: 3,
    name: "Jeff Bezoss",
    status: "applied",
    note: "As a problem solver and efficiency enthusiast, I believe I can streamline your household chores effectively.",
  },
  {
    id: 4,
    name: "Elon Musk",
    status: "applied",
    note: "I can bring my innovative mindset and automate your household tasks using cutting-edge technology.",
  },
  {
    id: 5,
    name: "Oprah Winfrey",
    status: "applied",
    note: "With my organizational skills and attention to detail, I can help transform your home into a well-managed sanctuary.",
  },
  {
    id: 6,
    name: "Warren Buffett",
    status: "applied",
    note: "I may not have experience with household chores, but I'm a quick learner and can contribute my analytical skills to optimize your tasks.",
  },
  {
    id: 7,
    name: "Angela Merkel",
    status: "applied",
    note: "As a former Chancellor, I understand the importance of efficiency and organization. I'd be delighted to assist you with your household chores.",
  },
  {
    id: 8,
    name: "Barack Obama",
    status: "applied",
    note: "With my multitasking abilities and attention to detail, I can tackle your household tasks while promoting a positive and inclusive environment.",
  },
  {
    id: 9,
    name: "Malala Yousafzai",
    status: "applied",
    note: "I believe in the power of education and empowerment. Let me help you with your chores while inspiring others to create positive change.",
  },
  {
    id: 10,
    name: "Serena Williams",
    status: "applied",
    note: "Just as I dominate the tennis court, I'll conquer your household chores with precision and dedication.",
  },
  {
    id: 11,
    name: "Elon Musk",
    status: "applied",
    note: "I can bring my innovative mindset and automate your household tasks using cutting-edge technology.",
  },
  {
    id: 12,
    name: "Oprah Winfrey",
    status: "applied",
    note: "With my organizational skills and attention to detail, I can help transform your home into a well-managed sanctuary.",
  },
  {
    id: 13,
    name: "Warren Buffett",
    status: "applied",
    note: "I may not have experience with household chores, but I'm a quick learner and can contribute my analytical skills to optimize your tasks.",
  },
  {
    id: 14,
    name: "Angela Merkel",
    status: "applied",
    note: "As a former Chancellor, I understand the importance of efficiency and organization. I'd be delighted to assist you with your household chores.",
  },
  {
    id: 15,
    name: "Barack Obama",
    status: "applied",
    note: "With my multitasking abilities and attention to detail, I can tackle your household tasks while promoting a positive and inclusive environment.",
  },
];

export function PotentialCaregiverTable() {
  const router = useRouter();
  return (
    <div className="max-h-96 overflow-auto rounded-md border ">
      <Table>
        <TableCaption>
          Caregivers who have applied to your session.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {potentialCaregiver.map((potentialCaregiver) => (
            <TableRow className="px-4 py-2" key={potentialCaregiver.id}>
              <TableCell className="font-medium">
                {potentialCaregiver.name}
              </TableCell>
              <TableCell className="">{potentialCaregiver.status}</TableCell>
              <TableCell className="">{potentialCaregiver.note}</TableCell>
              <TableCell className="flex space-x-1 text-right">
                <Button
                  onClick={() => {
                    void router.push("/caregiverProfile");
                  }}
                  size="sm"
                  variant="outline"
                >
                  Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    void router.push("/messages");
                  }}
                  size="sm"
                >
                  Message
                </Button>
                <Button variant="outline" size="sm">
                  Accept
                </Button>
                <Button variant="outline" size="sm">
                  Deny
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
