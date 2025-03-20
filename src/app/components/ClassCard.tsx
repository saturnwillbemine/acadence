'use client';
import { Card, CardSection, Text, Badge, Button, Group } from '@mantine/core';
import NextImage from 'next/image';
import ClassBanner from '../../../public/images/classbanner.jpg';
import { useRouter } from 'next/navigation';

interface ClassCardProps {
  className: string;
  deptName: string;
  classDesc: string;
  classID: number;
}

export default function ClassCard({ className, deptName, classDesc, classID }: ClassCardProps) {

    const router = useRouter();

  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <CardSection>
        <NextImage
          src={ClassBanner}
          height={160}
          alt="ClassBanner"/>
      </CardSection>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{className}</Text>
        <Badge color="myColor">{deptName}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {classDesc}
      </Text>

      <Button color="myColor" fullWidth mt="md" radius="md" onClick={() => router.push(`/class/${classID}`) }>
        Select Class
      </Button>
    </Card>
  );
}