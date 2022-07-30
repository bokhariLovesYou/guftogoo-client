import React, { useState, useEffect } from "react";
import Main from "@/components/layouts/Main";
import Container from "@/components/layouts/Container";
import Section from "@/components/layouts/Section";
import Heading from "@/components/core/Heading";
import Button from "@/components/core/Button";
import { Richtext } from "@/components/core/FormElements";
import Header from "@/components/modules/Header";
import toast, { Toaster } from "react-hot-toast";
import { useSWRConfig } from "swr";
import EditorTopbar from "@/components/modules/EditorTopbar";
import TextareaAutosize from "react-textarea-autosize";
import { useDraftByIdGET } from "@/lib/Fetcher";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppWrapper";
import { useForm } from "react-hook-form";
import Spinner from "@/components/core/Spinner";
import axios from "axios";
import { sleeper } from "@/lib/Helpers";
// Rich Text
import parse from "html-react-parser";
import { useEditor as useRichTextEditor } from "@tiptap/react";
import RichTextExtensions from "@/lib/RichTextExtensions";

const DraftsEditor = () => {
  const { handlers, user } = useAppContext();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading: draftLoading, isError: draftError } = useDraftByIdGET(id, user.token);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    // formState,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm({
    mode: `all`,
  });
  const [saveDraft, setSaveDraft] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });
  const [unsavedChanges, setUnsavedChanges] = useState(0);
  const [richTextEditorContent, setRichTextEditorContent] = useState(null);

  let draft;
  let attributes;
  const saveThreshold = 10;

  if (data) {
    draft = data.data;
    attributes = draft.attributes;
  }

  if (draftError) {
    if (typeof window !== "undefined") {
      location.replace(`/drafts`);
    }
  }

  const handleSave = () => {
    const values = getValues();
    setSaveDraft((prevState) => ({ ...prevState, isLoading: true }));
    const payload = {
      data: {
        draftTitle: values.articleTitle.trim(),
        draftDescription: values.articleDescription,
        draftContent: richTextEditorContent,
      },
    };
    const postPayload = async () => {
      await axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(sleeper(500))
        .then((res) => {
          if (unsavedChanges - saveThreshold > -1) {
            setUnsavedChanges((prevState) => prevState - saveThreshold);
          } else {
            setUnsavedChanges(0);
          }
          setSaveDraft((prevState) => ({
            ...prevState,
            response: res,
            isLoading: false,
          }));
        })
        .catch((err) => {
          console.log(err);
          alert("Ouch! An error occured. Please try again later.");
          setSaveDraft((prevState) => ({ ...prevState, isLoading: false }));
        });
    };
    postPayload();
  };

  const handleUnsavedChanges = () => {
    setUnsavedChanges((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (attributes) {
      setRichTextEditorContent(attributes.draftContent);
    }
  }, [attributes]);

  useEffect(() => {
    if (unsavedChanges === saveThreshold) {
      handleSave();
    }
  }, [unsavedChanges]);

  const richTextEditor = useRichTextEditor({
    extensions: RichTextExtensions,
    editorProps: {
      attributes: {
        class:
          "prose py-6 focus:outline-none px-1 w-[100%] max-w-[100%] min-h-[200vh] CUSTOM__rich-text-editor__content-editable",
      },
    },
    content: richTextEditorContent,
    onUpdate({ editor }) {
      handleUnsavedChanges();
      setRichTextEditorContent(editor.getHTML());
    },
  });
  return (
    <>
      <Header hidden />
      {draftLoading && (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <Spinner />
        </div>
      )}
      {!draftLoading && !draftError && (
        <>
          <Main style={{ backgroundColor: "#fafbff", minHeight: "100vh" }}>
            <EditorTopbar
              unsavedChanges={unsavedChanges}
              savingLoading={saveDraft.isLoading}
              handleSave={() => handleSave()}
            />
            <Section className="">
              <Container>
                <div className="py-8 bg-white max-w-[1000px] mx-auto border-l-2 border-r-2 px-8 min-h-screen">
                  <div className="AddCover mb-6 text-xs text-left">
                    <Button withoutDestination variant="transparent" className="rounded-full px-4">
                      <div className="flex">
                        <div className="">
                          <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 512 512">
                            <path d="M324.9 157.8c-11.38-17.38-39.89-17.31-51.23-.063L200.5 268.5l-16.4-22.6c-11.4-16.8-38.2-16-49.7 0l-64.52 89.16c-6.797 9.406-7.75 21.72-2.547 32C72.53 377.5 83.05 384 94.75 384h322.5c11.41 0 21.8-6.281 27.14-16.38a30.922 30.922 0 0 0-1.516-31.56L324.9 157.8zM95.8 352l62.39-87.38 29.91 41.34c3.1 4.24 8.3 7.24 13.3 6.64 5.25-.125 10.12-2.781 13.02-7.188l83.83-129.9L415 352H95.8zM447.1 32h-384C28.65 32-.01 60.65-.01 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96c.01-35.35-27.79-64-63.99-64zM480 416c0 17.64-14.36 32-32 32H64c-17.64 0-32-14.36-32-32V96c0-17.64 14.36-32 32-32h384c17.64 0 32 14.36 32 32v320zM144 192c26.5 0 48-21.5 48-48s-21.5-48-48-48-48 21.5-48 48 21.5 48 48 48zm0-64c8.822 0 15.1 7.178 15.1 16s-6.3 16-15.1 16-16-7.2-16-16 7.2-16 16-16z"></path>
                          </svg>
                        </div>
                        <div className="">
                          <span> Add Cover Image</span>
                        </div>
                      </div>
                    </Button>
                  </div>
                  <div className="ArticleTitle mb-4">
                    <TextareaAutosize
                      minRows={1}
                      maxRows={8}
                      placeholder="Article title..."
                      name="articleTitle"
                      className="resize-none appearance-none px-0 relative block w-full h2 border-0 font-bold focus:border-0 focus:ring-0"
                      {...register("articleTitle", {
                        required: true,
                        onChange: () => handleUnsavedChanges(),
                      })}
                      defaultValue={attributes?.draftTitle}
                    />
                  </div>
                  <div className="ArticleSubtitle mb-8">
                    <TextareaAutosize
                      minRows={1}
                      maxRows={8}
                      placeholder="Article Subtitle..."
                      className="resize-none appearance-none px-0 text-gray-800 relative block w-full h4 border-0 font-medium focus:border-0 focus:ring-0"
                      {...register("articleDescription", {
                        required: true,
                        onChange: () => handleUnsavedChanges(),
                      })}
                      defaultValue={attributes?.draftDescription}
                    ></TextareaAutosize>
                  </div>
                  <div className="RichtextEditor">
                    <Richtext
                      name="content"
                      defaultContent={attributes.draftContent}
                      editor={richTextEditor}
                    />
                  </div>
                </div>
              </Container>
            </Section>
          </Main>
          <Toaster />
        </>
      )}
    </>
  );
};

export default DraftsEditor;
