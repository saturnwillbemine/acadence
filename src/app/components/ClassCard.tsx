import { Card, CardSection, Text, Badge, Button, Group } from '@mantine/core';
import NextImage from 'next/image';
import ClassBanner from '../../../public/images/classbanner.jpg';

export default function ClassCard() {
  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <CardSection>
        <NextImage
          src={ClassBanner}
          height={160}
          alt="ClassBanner"/>
      </CardSection>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>ClassName</Text>
        <Badge color="myColor">Block #</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        Class Description
      </Text>

      <Button color="myColor" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
}