import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import NoteDetailsClient from "@/components/NoteDetails/NoteDetails.client";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

async function NotePreview({ params }: NotePreviewProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <Modal>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient id={id} />
      </HydrationBoundary>
    </Modal>
  );
}

export default NotePreview;
