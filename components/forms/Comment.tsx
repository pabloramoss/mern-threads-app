'use client';
// import { createThread } from "@/lib/actions/thread.actions";
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Image from 'next/image';

import { CommentValidation } from '@/lib/validations/thread';
import { addCommentToThread } from '@/lib/actions/thread.actions';

import { Button } from '../ui/button';
import { FormField, FormItem, FormLabel, FormControl, Form } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment: React.FC<Props> = ({ threadId, currentUserId, currentUserImg }) => {
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    console.log('form', form.getValues());
    await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);

    form.reset();
  };

  return (
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex gap-3 items-center w-full">
              <FormLabel>
                <Image
                  alt="Profile image"
                  className="rounded-full object-cover"
                  height={48}
                  src={currentUserImg}
                  width={48}
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  className="no-focus outline-none text-light-1"
                  placeholder="Comment..."
                  type="text"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="comment-form_btn" type="submit">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
