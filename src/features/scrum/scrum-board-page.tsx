"use client";

import * as React from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  useScrumCards,
  useUpdateScrumCard,
  useDeleteScrumCard,
} from "@/features/scrum/hooks";
import { ScrumCardFormDrawer } from "@/features/scrum/scrum-card-form-drawer";
import { SCRUM_COLUMNS } from "@/features/scrum/schemas";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingState } from "@/components/shared/loading-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/utils";
import type { ScrumCard, ScrumStatus } from "@/types";

function priorityVariant(p: ScrumCard["priority"]) {
  if (p === "high") return "destructive" as const;
  if (p === "low") return "secondary" as const;
  return "outline" as const;
}

function SortableCard({
  card,
  locale,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}: {
  card: ScrumCard;
  locale: string;
  canEdit: boolean;
  canDelete: boolean;
  onEdit: (card: ScrumCard) => void;
  onDelete: (card: ScrumCard) => void;
}) {
  const t = useTranslations("scrum");
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { type: "card", card } });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group rounded-xl border border-border/70 bg-background p-3 text-start shadow-float-sm",
        isDragging && "opacity-40",
      )}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="mt-0.5 cursor-grab touch-none rounded-md p-0.5 text-muted-foreground opacity-60 transition-opacity hover:opacity-100 active:cursor-grabbing"
          aria-label={t("drag")}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium leading-snug">
              {locale === "fa" ? card.title : card.titleEn}
            </p>
            {(canEdit || canDelete) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    className="size-7 shrink-0 opacity-0 group-hover:opacity-100"
                    aria-label={t("actions")}
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {canEdit ? (
                    <DropdownMenuItem onClick={() => onEdit(card)}>
                      <Pencil className="size-4" />
                      {t("edit")}
                    </DropdownMenuItem>
                  ) : null}
                  {canDelete ? (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => onDelete(card)}
                      >
                        <Trash2 className="size-4" />
                        {t("delete")}
                      </DropdownMenuItem>
                    </>
                  ) : null}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {locale === "fa" ? card.assignee : card.assigneeEn}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <Badge variant={priorityVariant(card.priority)} className="text-[10px]">
              {t(`priority.${card.priority}`)}
            </Badge>
            <Badge variant="secondary" className="text-[10px]">
              {card.points} {t("points")}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardPreview({ card, locale }: { card: ScrumCard; locale: string }) {
  const t = useTranslations("scrum");
  return (
    <div className="w-64 rounded-xl border border-primary/30 bg-background p-3 text-start shadow-float-lg ring-1 ring-primary/20">
      <p className="text-sm font-medium">
        {locale === "fa" ? card.title : card.titleEn}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {locale === "fa" ? card.assignee : card.assigneeEn}
      </p>
    </div>
  );
}

function Column({
  id,
  title,
  cards,
  locale,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
  onAdd,
}: {
  id: ScrumStatus;
  title: string;
  cards: ScrumCard[];
  locale: string;
  canEdit: boolean;
  canDelete: boolean;
  onEdit: (card: ScrumCard) => void;
  onDelete: (card: ScrumCard) => void;
  onAdd: (status: ScrumStatus) => void;
}) {
  const t = useTranslations("scrum");
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <Surface
      elevated
      className={cn(
        "flex min-h-[28rem] w-[16.5rem] shrink-0 flex-col gap-3 p-3 transition-colors sm:w-[17.5rem]",
        isOver && "ring-2 ring-primary/30",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="flex items-center gap-1">
          <Badge variant="secondary">{cards.length}</Badge>
          {canEdit ? (
            <Button
              size="icon-sm"
              variant="ghost"
              className="size-7"
              aria-label={t("create")}
              onClick={() => onAdd(id)}
            >
              <Plus className="size-4" />
            </Button>
          ) : null}
        </div>
      </div>
      <SortableContext
        id={id}
        items={cards.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="flex flex-1 flex-col gap-2">
          {cards.map((card) => (
            <SortableCard
              key={card.id}
              card={card}
              locale={locale}
              canEdit={canEdit}
              canDelete={canDelete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </Surface>
  );
}

function findColumnOf(
  cards: ScrumCard[],
  id: string | null,
): ScrumStatus | null {
  if (!id) return null;
  if (SCRUM_COLUMNS.includes(id as ScrumStatus)) return id as ScrumStatus;
  return cards.find((c) => c.id === id)?.status ?? null;
}

export function ScrumBoardPage() {
  const t = useTranslations("scrum");
  const locale = useLocale();
  const hasPermission = useAuthStore((s) => s.hasPermission);
  const canCreate = hasPermission("scrum:create");
  const canEdit = hasPermission("scrum:edit");
  const canDelete = hasPermission("scrum:delete");

  const query = useScrumCards({ page: 1, pageSize: 200, sortBy: "updatedAt" });
  const updateCard = useUpdateScrumCard();
  const deleteCard = useDeleteScrumCard();

  const [cards, setCards] = React.useState<ScrumCard[]>([]);
  React.useEffect(() => {
    if (query.data?.data) setCards(query.data.data);
  }, [query.data?.data]);

  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<ScrumCard | null>(null);
  const [defaultStatus, setDefaultStatus] =
    React.useState<ScrumStatus>("backlog");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const activeCard = cards.find((c) => c.id === activeId) ?? null;

  function openCreate(status: ScrumStatus = "backlog") {
    setEditing(null);
    setDefaultStatus(status);
    setFormOpen(true);
  }

  function openEdit(card: ScrumCard) {
    setEditing(card);
    setFormOpen(true);
  }

  async function handleDelete(card: ScrumCard) {
    try {
      await deleteCard.mutateAsync(card.id);
      toast.success(t("deleted"));
    } catch {
      toast.error(t("error"));
    }
  }

  function onDragStart(event: DragStartEvent) {
    if (!canEdit) return;
    setActiveId(String(event.active.id));
  }

  function onDragOver(event: DragOverEvent) {
    if (!canEdit) return;
    const { active, over } = event;
    if (!over) return;

    const activeCol = findColumnOf(cards, String(active.id));
    const overCol = findColumnOf(cards, String(over.id));
    if (!activeCol || !overCol || activeCol === overCol) return;

    setCards((prev) => {
      const moving = prev.find((c) => c.id === active.id);
      if (!moving) return prev;
      return prev.map((c) =>
        c.id === moving.id ? { ...c, status: overCol } : c,
      );
    });
  }

  async function onDragEnd(event: DragEndEvent) {
    if (!canEdit) return;
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const card = cards.find((c) => c.id === active.id);
    if (!card) return;

    const overCol = findColumnOf(cards, String(over.id));
    if (!overCol) return;

    try {
      await updateCard.mutateAsync({
        id: card.id,
        patch: {
          status: card.status,
          updatedAt: new Date().toISOString(),
        },
      });
      toast.success(t("moved"));
    } catch {
      toast.error(t("error"));
      void query.refetch();
    }
  }

  if (query.isLoading) return <LoadingState />;

  return (
    <div className="space-y-5">
      <PageHeader
        title={t("title")}
        description={t("subtitle")}
        actions={
          canCreate ? (
            <Button size="sm" onClick={() => openCreate()}>
              <Plus className="size-4" />
              {t("create")}
            </Button>
          ) : null
        }
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={(e) => void onDragEnd(e)}
      >
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
          {SCRUM_COLUMNS.map((col) => (
            <Column
              key={col}
              id={col}
              title={t(`columns.${col}`)}
              cards={cards.filter((c) => c.status === col)}
              locale={locale}
              canEdit={canEdit}
              canDelete={canDelete}
              onEdit={openEdit}
              onDelete={(c) => void handleDelete(c)}
              onAdd={openCreate}
            />
          ))}
        </div>
        <DragOverlay dropAnimation={null}>
          {activeCard ? (
            <CardPreview card={activeCard} locale={locale} />
          ) : null}
        </DragOverlay>
      </DndContext>

      <ScrumCardFormDrawer
        open={formOpen}
        onOpenChange={setFormOpen}
        card={editing}
        defaultStatus={defaultStatus}
      />
    </div>
  );
}
